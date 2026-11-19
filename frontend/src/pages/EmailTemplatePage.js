import React, { useState } from 'react';
import { Copy, Check, Mail, ShoppingCart, UserPlus, KeyRound, Eye, Code, Download, Smartphone, Monitor, FileText, Tag, Upload, Loader2, Edit3, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  NewsletterTemplate,
  generateNewsletterHTML,
  TransactionTemplate,
  generateTransactionHTML,
  WelcomeTemplate,
  generateWelcomeHTML,
  PasswordResetTemplate,
  generatePasswordResetHTML,
  BasicTemplate,
  generateBasicHTML,
  BlackWeekTemplate,
  generateBlackWeekHTML
} from '@/components/email-templates';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Default editable content for each template
const defaultTemplateData = {
  blackweek: {
    headline: 'BLACK FRIDAY',
    subheadline: 'ALIENTECH',
    mainTitle: 'Starten Sie mit Chiptuning.',
    mainSubtitle: 'KESS3 Slave. Ihr Einstieg auf das nächste Level.',
    badgeText: 'FÜR NEUKUNDEN · HARDWARE & FILESERVICE',
    productName: 'KESS3 Slave',
    originalPrice: '3.090,00 €',
    salePrice: '1.690,00 €',
    savings: '1.400,00 €',
    creditsValue: '550€',
    creditsText: '5 Tuningfiles inklusive',
    featureText: 'Inklusive OBD, Bench und Boot für Pkw. Wir unterstützen Sie online beim Einstieg und beim ersten Auto.',
    ctaText: 'JETZT ANGEBOT ANSEHEN',
    ctaUrl: 'https://www.chiptuning-tools.shop/alientech/alientech-starter-paket'
  },
  basic: {
    headline: 'Ihre Überschrift hier',
    content: 'Ihr Inhalt hier...'
  },
  newsletter: {
    headline: 'Newsletter Titel',
    introText: 'Hallo! Hier sind die neuesten Updates...',
    ctaText: 'Mehr erfahren',
    ctaUrl: 'https://tuningfiles-download.com'
  },
  transaction: {
    orderNumber: 'TFD-2024-001234',
    customerName: 'Max Mustermann',
    orderTotal: '149,00 €'
  },
  welcome: {
    customerName: 'Max Mustermann',
    ctaText: 'Jetzt starten',
    ctaUrl: 'https://tuningfiles-download.com'
  },
  password: {
    customerName: 'Max Mustermann',
    resetLink: 'https://tuningfiles-download.com/reset/token123',
    validityTime: '24 Stunden'
  }
};

const templates = [
  {
    id: 'blackweek',
    name: 'Black Week',
    description: 'Sale & Angebote',
    icon: Tag,
    Component: BlackWeekTemplate,
    generateHTML: generateBlackWeekHTML,
    color: 'from-red-600/30 to-black/30'
  },
  {
    id: 'basic',
    name: 'Grundvorlage',
    description: 'Leeres Template',
    icon: FileText,
    Component: BasicTemplate,
    generateHTML: generateBasicHTML,
    color: 'from-gray-500/20 to-gray-900/20'
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Marketing & Promotions',
    icon: Mail,
    Component: NewsletterTemplate,
    generateHTML: generateNewsletterHTML,
    color: 'from-red-500/20 to-red-900/20'
  },
  {
    id: 'transaction',
    name: 'Bestellung',
    description: 'Bestellbestätigung',
    icon: ShoppingCart,
    Component: TransactionTemplate,
    generateHTML: generateTransactionHTML,
    color: 'from-green-500/20 to-green-900/20'
  },
  {
    id: 'welcome',
    name: 'Willkommen',
    description: 'Neue Kunden',
    icon: UserPlus,
    Component: WelcomeTemplate,
    generateHTML: generateWelcomeHTML,
    color: 'from-blue-500/20 to-blue-900/20'
  },
  {
    id: 'password',
    name: 'Passwort',
    description: 'Passwort zurücksetzen',
    icon: KeyRound,
    Component: PasswordResetTemplate,
    generateHTML: generatePasswordResetHTML,
    color: 'from-orange-500/20 to-orange-900/20'
  }
];

export const EmailTemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [viewMode, setViewMode] = useState('preview');
  const [deviceView, setDeviceView] = useState('desktop');
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAll, setUploadingAll] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [templateData, setTemplateData] = useState(defaultTemplateData);

  const currentData = templateData[selectedTemplate.id] || {};

  const handleDataChange = (field, value) => {
    setTemplateData(prev => ({
      ...prev,
      [selectedTemplate.id]: {
        ...prev[selectedTemplate.id],
        [field]: value
      }
    }));
  };

  const handleCopyHTML = async () => {
    const html = selectedTemplate.generateHTML(currentData);
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast.success('HTML-Code wurde kopiert!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Kopieren fehlgeschlagen');
    }
  };

  const handleDownloadHTML = () => {
    const html = selectedTemplate.generateHTML(currentData);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate.id}-email-template.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML-Datei wurde heruntergeladen!');
  };

  const handleUploadToListmonk = async () => {
    setUploading(true);
    try {
      const html = selectedTemplate.generateHTML(currentData);
      const response = await fetch(`${API_URL}/api/listmonk/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_name: `TFD - ${selectedTemplate.name}`,
          template_body: html,
          template_type: 'campaign'
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success(data.message || `"${selectedTemplate.name}" wurde zu Listmonk exportiert!`);
      } else {
        toast.error(data.detail || 'Export fehlgeschlagen');
      }
    } catch (err) {
      toast.error(`Fehler: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadAllToListmonk = async () => {
    setUploadingAll(true);
    let successCount = 0;
    let errorCount = 0;
    
    for (const template of templates) {
      try {
        const data = templateData[template.id] || {};
        const html = template.generateHTML(data);
        const response = await fetch(`${API_URL}/api/listmonk/templates`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            template_name: `TFD - ${template.name}`,
            template_body: html,
            template_type: 'campaign'
          })
        });
        
        if (response.ok) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (err) {
        errorCount++;
      }
    }
    
    setUploadingAll(false);
    
    if (errorCount === 0) {
      toast.success(`Alle ${successCount} Templates wurden zu Listmonk aktualisiert!`);
    } else {
      toast.warning(`${successCount} erfolgreich, ${errorCount} fehlgeschlagen`);
    }
  };

  const SelectedComponent = selectedTemplate.Component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img 
                src="https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png" 
                alt="TuningFiles Download" 
                className="h-8 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">E-Mail Vorlagen</h1>
                <p className="text-xs text-muted-foreground">Responsive HTML Templates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditor(!showEditor)}
                className="hidden md:flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                {showEditor ? 'Editor schließen' : 'Bearbeiten'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUploadToListmonk}
                disabled={uploading}
                className="hidden md:flex items-center gap-2 border-green-600 text-green-500 hover:bg-green-600/10"
              >
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Zu Listmonk
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadHTML}
                className="hidden sm:flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={handleCopyHTML}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="hidden sm:inline">{copied ? 'Kopiert!' : 'HTML kopieren'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Template Selection */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Vorlagen auswählen
              </h2>
              <div className="space-y-3">
                {templates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate.id === template.id;
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary/10 border-2 border-primary ring-2 ring-primary/20'
                          : 'bg-card border border-border hover:border-primary/50 hover:bg-card/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${template.color}`}>
                          <Icon className={`h-5 w-5 ${isSelected ? 'text-primary' : 'text-foreground'}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {template.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Export All Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleUploadAllToListmonk}
                disabled={uploadingAll}
                className="mt-4 w-full flex items-center justify-center gap-2 border-green-600 text-green-500 hover:bg-green-600/10"
              >
                {uploadingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploadingAll ? 'Exportiere...' : 'Alle zu Listmonk exportieren'}
              </Button>

              {/* Color Palette Info */}
              <Card className="mt-6 bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Farbpalette</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md" style={{ backgroundColor: '#121212' }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">#121212</p>
                      <p className="text-xs text-muted-foreground">Hintergrund</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md" style={{ backgroundColor: '#bd1f25' }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">#bd1f25</p>
                      <p className="text-xs text-muted-foreground">Akzent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md" style={{ backgroundColor: '#171717' }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">#171717</p>
                      <p className="text-xs text-muted-foreground">Karten</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content - Preview & Code */}
          <div className="lg:col-span-9">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <Tabs value={viewMode} onValueChange={setViewMode} className="w-full sm:w-auto">
                <TabsList className="bg-muted">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Vorschau
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    HTML-Code
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {viewMode === 'preview' && (
                <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`p-2 rounded-md transition-colors ${
                      deviceView === 'desktop' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`p-2 rounded-md transition-colors ${
                      deviceView === 'mobile' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Content Area */}
            {viewMode === 'preview' ? (
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {/* Browser Frame */}
                <div className="bg-muted px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-background rounded-lg px-3 py-1.5 text-xs text-muted-foreground text-center">
                        E-Mail Vorschau — {selectedTemplate.name}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Email Preview */}
                <div 
                  className={`transition-all duration-300 mx-auto ${
                    deviceView === 'mobile' ? 'max-w-[375px]' : 'max-w-none'
                  }`}
                  style={{ backgroundColor: '#121212' }}
                >
                  <div className="overflow-auto max-h-[calc(100vh-300px)]">
                    <SelectedComponent data={currentData} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{selectedTemplate.id}-email-template.html</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDownloadHTML}
                      className="h-8"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyHTML}
                      className="h-8"
                    >
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? 'Kopiert!' : 'Kopieren'}
                    </Button>
                  </div>
                </div>
                <div className="overflow-auto max-h-[calc(100vh-300px)]">
                  <pre className="p-6 text-sm font-mono text-foreground/80 whitespace-pre-wrap break-all">
                    <code>{selectedTemplate.generateHTML(currentData)}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Editor Panel */}
            {showEditor && (
              <Card className="mt-6 bg-card border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Edit3 className="h-5 w-5 text-primary" />
                        Content bearbeiten
                      </CardTitle>
                      <CardDescription>Passen Sie die Inhalte des {selectedTemplate.name} Templates an</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowEditor(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTemplate.id === 'blackweek' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="headline">Headline</Label>
                          <Input
                            id="headline"
                            value={currentData.headline || ''}
                            onChange={(e) => handleDataChange('headline', e.target.value)}
                            placeholder="BLACK FRIDAY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subheadline">Subheadline</Label>
                          <Input
                            id="subheadline"
                            value={currentData.subheadline || ''}
                            onChange={(e) => handleDataChange('subheadline', e.target.value)}
                            placeholder="ALIENTECH"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="mainTitle">Haupttitel</Label>
                          <Input
                            id="mainTitle"
                            value={currentData.mainTitle || ''}
                            onChange={(e) => handleDataChange('mainTitle', e.target.value)}
                            placeholder="Starten Sie mit Chiptuning."
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="mainSubtitle">Untertitel</Label>
                          <Input
                            id="mainSubtitle"
                            value={currentData.mainSubtitle || ''}
                            onChange={(e) => handleDataChange('mainSubtitle', e.target.value)}
                            placeholder="KESS3 Slave. Ihr Einstieg auf das nächste Level."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="productName">Produktname</Label>
                          <Input
                            id="productName"
                            value={currentData.productName || ''}
                            onChange={(e) => handleDataChange('productName', e.target.value)}
                            placeholder="KESS3 Slave"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="badgeText">Badge Text</Label>
                          <Input
                            id="badgeText"
                            value={currentData.badgeText || ''}
                            onChange={(e) => handleDataChange('badgeText', e.target.value)}
                            placeholder="FÜR NEUKUNDEN · HARDWARE & FILESERVICE"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="originalPrice">Originalpreis</Label>
                          <Input
                            id="originalPrice"
                            value={currentData.originalPrice || ''}
                            onChange={(e) => handleDataChange('originalPrice', e.target.value)}
                            placeholder="3.090,00 €"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salePrice">Aktionspreis</Label>
                          <Input
                            id="salePrice"
                            value={currentData.salePrice || ''}
                            onChange={(e) => handleDataChange('salePrice', e.target.value)}
                            placeholder="1.690,00 €"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="savings">Ersparnis</Label>
                          <Input
                            id="savings"
                            value={currentData.savings || ''}
                            onChange={(e) => handleDataChange('savings', e.target.value)}
                            placeholder="1.400,00 €"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="creditsText">Credits Text</Label>
                          <Input
                            id="creditsText"
                            value={currentData.creditsText || ''}
                            onChange={(e) => handleDataChange('creditsText', e.target.value)}
                            placeholder="5 Tuningfiles inklusive"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="featureText">Feature Text</Label>
                          <Textarea
                            id="featureText"
                            value={currentData.featureText || ''}
                            onChange={(e) => handleDataChange('featureText', e.target.value)}
                            placeholder="Inklusive OBD, Bench und Boot für Pkw..."
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ctaText">Button Text</Label>
                          <Input
                            id="ctaText"
                            value={currentData.ctaText || ''}
                            onChange={(e) => handleDataChange('ctaText', e.target.value)}
                            placeholder="JETZT ANGEBOT ANSEHEN"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ctaUrl">Button Link</Label>
                          <Input
                            id="ctaUrl"
                            value={currentData.ctaUrl || ''}
                            onChange={(e) => handleDataChange('ctaUrl', e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                      </>
                    )}
                    {selectedTemplate.id === 'newsletter' && (
                      <>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="headline">Headline</Label>
                          <Input
                            id="headline"
                            value={currentData.headline || ''}
                            onChange={(e) => handleDataChange('headline', e.target.value)}
                            placeholder="Newsletter Titel"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="introText">Intro Text</Label>
                          <Textarea
                            id="introText"
                            value={currentData.introText || ''}
                            onChange={(e) => handleDataChange('introText', e.target.value)}
                            placeholder="Hallo! Hier sind die neuesten Updates..."
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ctaText">Button Text</Label>
                          <Input
                            id="ctaText"
                            value={currentData.ctaText || ''}
                            onChange={(e) => handleDataChange('ctaText', e.target.value)}
                            placeholder="Mehr erfahren"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ctaUrl">Button Link</Label>
                          <Input
                            id="ctaUrl"
                            value={currentData.ctaUrl || ''}
                            onChange={(e) => handleDataChange('ctaUrl', e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                      </>
                    )}
                    {(selectedTemplate.id === 'welcome' || selectedTemplate.id === 'password' || selectedTemplate.id === 'transaction') && (
                      <>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="customerName">Kundenname</Label>
                          <Input
                            id="customerName"
                            value={currentData.customerName || ''}
                            onChange={(e) => handleDataChange('customerName', e.target.value)}
                            placeholder="Max Mustermann"
                          />
                        </div>
                        {selectedTemplate.id === 'transaction' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="orderNumber">Bestellnummer</Label>
                              <Input
                                id="orderNumber"
                                value={currentData.orderNumber || ''}
                                onChange={(e) => handleDataChange('orderNumber', e.target.value)}
                                placeholder="TFD-2024-001234"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="orderTotal">Bestellsumme</Label>
                              <Input
                                id="orderTotal"
                                value={currentData.orderTotal || ''}
                                onChange={(e) => handleDataChange('orderTotal', e.target.value)}
                                placeholder="149,00 €"
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {selectedTemplate.id === 'basic' && (
                      <>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="headline">Überschrift</Label>
                          <Input
                            id="headline"
                            value={currentData.headline || ''}
                            onChange={(e) => handleDataChange('headline', e.target.value)}
                            placeholder="Ihre Überschrift hier"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="content">Inhalt</Label>
                          <Textarea
                            id="content"
                            value={currentData.content || ''}
                            onChange={(e) => handleDataChange('content', e.target.value)}
                            placeholder="Ihr Inhalt hier..."
                            rows={4}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Responsive</p>
                      <p className="text-xs text-muted-foreground">Mobile & Desktop optimiert</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Kompatibel</p>
                      <p className="text-xs text-muted-foreground">Outlook, Gmail, Apple Mail</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Inline CSS</p>
                      <p className="text-xs text-muted-foreground">Sofort einsatzbereit</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets-rejwkqb3.emergentagent.net/job_responsive-mailer-3--6zpp8ape/artifacts/9e30b039835ace86_Tuning-Files-Logo-Weiss-500px-breite-1.png" 
                alt="TuningFiles Download" 
                className="h-6 w-auto opacity-60"
              />
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} TuningFiles Download
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/tuningfilesdownloadcom" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="https://www.facebook.com/tuningfilesdownload" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="https://wa.me/491797511144" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmailTemplatePage;
