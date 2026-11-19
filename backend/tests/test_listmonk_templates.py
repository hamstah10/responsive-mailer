# Listmonk integration tests: connection, template list, create-or-update (no duplicates), placeholder removal
import os
import re
import glob
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().strip('"').rstrip('/')

TEST_NAME = "TEST_ListmonkUpsert_Agent"
created_ids = []


def _listmonk_direct():
    url = os.environ.get('LISTMONK_API_URL')
    user = os.environ.get('LISTMONK_API_USER')
    tok = os.environ.get('LISTMONK_API_TOKEN')
    if not all([url, user, tok]):
        return None, None
    return url.rstrip('/'), (user, tok)


@pytest.fixture(scope="module", autouse=True)
def cleanup():
    yield
    url, auth = _listmonk_direct()
    if not url:
        return
    for tid in set(created_ids):
        requests.delete(f"{url}/api/templates/{tid}", auth=auth, timeout=20)


# Placeholder removal in template source files
def test_no_content_placeholder_in_template_files():
    files = glob.glob('/app/frontend/src/components/email-templates/*.js')
    assert files
    pat = re.compile(r'\{\{\s*template\s+"content"\s+\.\s*\}\}')
    offenders = [f for f in files if pat.search(open(f).read())]
    assert offenders == [], f"Placeholder found in {offenders}"


# Connection
def test_listmonk_connection():
    r = requests.get(f"{BASE_URL}/api/listmonk/test", timeout=30)
    assert r.status_code == 200
    d = r.json()
    assert d["success"] is True, d
    assert "Verbindung erfolgreich" in d["message"]


def test_listmonk_list_templates():
    r = requests.get(f"{BASE_URL}/api/listmonk/templates", timeout=30)
    assert r.status_code == 200
    assert isinstance(r.json().get("data"), list)


def _count(name):
    r = requests.get(f"{BASE_URL}/api/listmonk/templates", timeout=30)
    return [t for t in r.json()["data"] if t["name"] == name]


# Create then upsert (no duplicate) - body WITHOUT content placeholder (as app now sends)
def test_create_then_update_no_duplicate():
    body1 = "<html><body><h1>TEST v1</h1></body></html>"
    r1 = requests.post(f"{BASE_URL}/api/listmonk/templates", json={
        "template_name": TEST_NAME, "template_body": body1, "template_type": "campaign"}, timeout=60)
    print("create:", r1.status_code, r1.text[:400])
    if r1.status_code == 200 and r1.json().get("template_id"):
        created_ids.append(r1.json()["template_id"])
    assert r1.status_code == 200, r1.text
    assert "erstellt" in r1.json()["message"]
    first_id = r1.json()["template_id"]

    body2 = "<html><body><h1>TEST v2</h1></body></html>"
    r2 = requests.post(f"{BASE_URL}/api/listmonk/templates", json={
        "template_name": TEST_NAME, "template_body": body2, "template_type": "campaign"}, timeout=60)
    print("update:", r2.status_code, r2.text[:400])
    assert r2.status_code == 200, r2.text
    assert "aktualisiert" in r2.json()["message"]
    assert r2.json()["template_id"] == first_id

    matches = _count(TEST_NAME)
    assert len(matches) == 1
    assert "TEST v2" in matches[0]["body"]


# Same upsert flow but body includes placeholder (to diagnose Listmonk validation)
def test_create_with_placeholder_diagnostic():
    name = TEST_NAME + "_ph"
    body = '<html><body><h1>TEST ph</h1>{{ template "content" . }}</body></html>'
    r = requests.post(f"{BASE_URL}/api/listmonk/templates", json={
        "template_name": name, "template_body": body, "template_type": "campaign"}, timeout=60)
    print("ph create:", r.status_code, r.text[:400])
    if r.status_code == 200 and r.json().get("template_id"):
        created_ids.append(r.json()["template_id"])
    assert r.status_code == 200


def test_put_endpoint_invalid_id():
    r = requests.put(f"{BASE_URL}/api/listmonk/templates/99999999", json={
        "template_name": "TEST_x", "template_body": "<p>x</p>", "template_type": "campaign"}, timeout=30)
    print("put invalid:", r.status_code, r.text[:300])
    assert r.status_code in (400, 404)


def test_validation_missing_fields():
    r = requests.post(f"{BASE_URL}/api/listmonk/templates", json={"template_name": "TEST_y"}, timeout=30)
    assert r.status_code == 422
