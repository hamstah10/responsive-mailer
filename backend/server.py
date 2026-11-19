from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests
from requests.auth import HTTPBasicAuth


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# ============================================
# LISTMONK MODELS
# ============================================

class ListmonkTemplate(BaseModel):
    name: str
    body: str
    type: str = "campaign"
    subject: Optional[str] = None

class ListmonkTemplateCreate(BaseModel):
    template_name: str
    template_body: str
    template_type: str = "campaign"

class ListmonkResponse(BaseModel):
    success: bool
    message: str
    template_id: Optional[int] = None

# ============================================
# HELPER FUNCTIONS
# ============================================

def get_listmonk_auth():
    """Get Listmonk API authentication"""
    api_url = os.environ.get('LISTMONK_API_URL', '')
    api_user = os.environ.get('LISTMONK_API_USER', '')
    api_token = os.environ.get('LISTMONK_API_TOKEN', '')
    
    if not all([api_url, api_user, api_token]):
        raise HTTPException(status_code=500, detail="Listmonk API credentials not configured")
    
    return api_url, HTTPBasicAuth(api_user, api_token)

# ============================================
# ROUTES
# ============================================

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# ============================================
# LISTMONK ROUTES
# ============================================

@api_router.get("/listmonk/test")
async def test_listmonk_connection():
    """Test connection to Listmonk API"""
    try:
        api_url, auth = get_listmonk_auth()
        response = requests.get(f"{api_url}/api/templates", auth=auth, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            template_count = len(data.get("data", []))
            return {
                "success": True,
                "message": f"Verbindung erfolgreich! {template_count} Templates gefunden.",
                "url": api_url
            }
        else:
            return {
                "success": False,
                "message": f"API Fehler: {response.status_code}",
                "url": api_url
            }
    except Exception as e:
        return {
            "success": False,
            "message": f"Verbindungsfehler: {str(e)}",
            "url": os.environ.get('LISTMONK_API_URL', 'nicht konfiguriert')
        }

@api_router.get("/listmonk/templates")
async def get_listmonk_templates():
    """Get all templates from Listmonk"""
    try:
        api_url, auth = get_listmonk_auth()
        response = requests.get(f"{api_url}/api/templates", auth=auth, timeout=30)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Listmonk API error: {response.text}")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Connection error: {str(e)}")

@api_router.post("/listmonk/templates", response_model=ListmonkResponse)
async def create_or_update_listmonk_template(template: ListmonkTemplateCreate):
    """Create a new template or update existing one in Listmonk"""
    try:
        api_url, auth = get_listmonk_auth()
        
        # First, check if template with same name already exists
        existing_response = requests.get(f"{api_url}/api/templates", auth=auth, timeout=30)
        existing_template_id = None
        
        if existing_response.status_code == 200:
            existing_data = existing_response.json()
            for t in existing_data.get("data", []):
                if t.get("name") == template.template_name:
                    existing_template_id = t.get("id")
                    break
        
        payload = {
            "name": template.template_name,
            "type": template.template_type,
            "body": template.template_body
        }
        
        if existing_template_id:
            # Update existing template
            response = requests.put(
                f"{api_url}/api/templates/{existing_template_id}",
                json=payload,
                auth=auth,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            action = "aktualisiert"
        else:
            # Create new template
            response = requests.post(
                f"{api_url}/api/templates",
                json=payload,
                auth=auth,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            action = "erstellt"
        
        if response.status_code == 200:
            data = response.json()
            template_id = existing_template_id or (data.get("data", {}).get("id") if isinstance(data.get("data"), dict) else None)
            return ListmonkResponse(
                success=True,
                message=f"Template '{template.template_name}' erfolgreich {action}",
                template_id=template_id
            )
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Listmonk API error: {response.text}")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Connection error: {str(e)}")

@api_router.put("/listmonk/templates/{template_id}", response_model=ListmonkResponse)
async def update_listmonk_template(template_id: int, template: ListmonkTemplateCreate):
    """Update an existing template in Listmonk"""
    try:
        api_url, auth = get_listmonk_auth()
        
        payload = {
            "name": template.template_name,
            "type": template.template_type,
            "body": template.template_body
        }
        
        response = requests.put(
            f"{api_url}/api/templates/{template_id}",
            json=payload,
            auth=auth,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            return ListmonkResponse(
                success=True,
                message=f"Template '{template.template_name}' erfolgreich aktualisiert",
                template_id=template_id
            )
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Listmonk API error: {response.text}")
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Connection error: {str(e)}")

# ============================================
# INCLUDE ROUTER & MIDDLEWARE
# ============================================

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
