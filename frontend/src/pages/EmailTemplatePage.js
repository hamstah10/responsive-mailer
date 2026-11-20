import React, { useState, useEffect } from 'react';
import { Copy, Check, Mail, ShoppingCart, UserPlus, KeyRound, Eye, Code, Download, Smartphone, Monitor, FileText, Tag, Upload, Loader2, Edit3, X, Save, Plus, Trash2, CopyPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
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
  generateBlackWeekHTML,
  BlackWeekCreditsTemplate,
  generateBlackWeekCreditsHTML
} from '@/components/email-templates';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CountdownFields = ({ data, onChange }) => (
  <>
    <div className="md:col-span-2 flex items-center justify-between rounded-lg border border-red-900/60 bg-red-950/20 p-4">
      <div>
        <Label htmlFor="lastChance" className="text-base">Letzte Chance (Erinnerung)</Label>
        <p className="text-xs text-muted-foreground mt-1">Roter Dringlichkeits-Balken oben und Button „JETZT NOCH SICHERN“</p>
      </div>
      <Switch
        id="lastChance"
        data-testid="last-chance-switch"
        checked={!!data.lastChance}
        onCheckedChange={(v) => onChange('lastChance', v)}
      />
    </div>
    {data.lastChance && (
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="urgencyText">Text im Dringlichkeits-Balken</Label>
        <Input
          id="urgencyText"
          data-testid="urgency-text-input"
          value={data.urgencyText || ''}
          onChange={(e) => onChange('urgencyText', e.target.value)}
          placeholder="Leer lassen = automatisch aus dem Enddatum"
        />
      </div>
    )}
    <div className="space-y-2">
      <Label htmlFor="countdownEnd">Countdown: Aktion endet am</Label>
      <Input
        id="countdownEnd"
        data-testid="countdown-end-input"
        type="datetime-local"
        value={data.countdownEnd || ''}
        onChange={(e) => onChange('countdownEnd', e.target.value)}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="countdownLabel">Countdown Überschrift</Label>
      <Input
        id="countdownLabel"
        data-testid="countdown-label-input"
        value={data.countdownLabel || ''}
        onChange={(e) => onChange('countdownLabel', e.target.value)}
        placeholder="NUR NOCH"
      />
    </div>
  </>
);

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
    ctaUrl: 'https://www.chiptuning-tools.shop/alientech/alientech-starter-paket',
    countdownEnd: '2026-11-30T23:59',
    countdownLabel: 'NUR NOCH'
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
    customerName: '{{ .Subscriber.FirstName | default "Kunde" }}',
    orderTotal: '149,00 €'
  },
  welcome: {
    customerName: '{{ .Subscriber.FirstName | default "Kunde" }}',
    ctaText: 'Jetzt starten',
    ctaUrl: 'https://tuningfiles-download.com'
  },
  password: {
    customerName: '{{ .Subscriber.FirstName | default "Kunde" }}',
    resetLink: 'https://tuningfiles-download.com/reset/token123',
    validityTime: '24 Stunden'
  },
  blackweekcredits: {
    headline: 'BLACK WEEK',
    subheadline: 'EXKLUSIV FÜR BESTANDSKUNDEN',
    mainTitle: '15% Bonus auf alle Credits',
    mainSubtitle: 'Ihr Treue-Bonus. Nur diese Woche.',
    greeting: 'Hallo',
    customerName: '{{ .Subscriber.FirstName | default "geschätzter Kunde" }}',
    introText: 'Als treuer Kunde erhalten Sie diese Woche exklusiven Zugang zu unserem Black Week Special:',
    discountBadge: '15% BONUS',
    discountText: 'Extra-Credits geschenkt',
    countdownEnd: '2026-11-30T23:59',
    countdownLabel: 'NUR NOCH',
    ctaText: 'JETZT IM PORTAL EINLOGGEN',
    ctaUrl: 'https://portal.tuningfiles-download.com/'
  }
};

// Base templates (not deletable)
const baseTemplates = [
  {
    id: 'blackweek',
    name: 'Black Week',
    description: 'Neukunden Angebot',
    icon: Tag,
    Component: BlackWeekTemplate,
    generateHTML: generateBlackWeekHTML,
    color: 'from-red-600/30 to-black/30'
  },
  {
    id: 'blackweekcredits',
    name: 'Black Week Credits',
    description: 'Bestandskunden 15%',
    icon: Tag,
    Component: BlackWeekCreditsTemplate,
    generateHTML: generateBlackWeekCreditsHTML,
    color: 'from-red-500/30 to-green-900/30'
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

// Template type mapping for duplicates
const templateTypeMap = {
  blackweek: { Component: BlackWeekTemplate, generateHTML: generateBlackWeekHTML, icon: Tag, baseColor: 'from-red-600/30 to-black/30' },
  blackweekcredits: { Component: BlackWeekCreditsTemplate, generateHTML: generateBlackWeekCreditsHTML, icon: Tag, baseColor: 'from-red-500/30 to-green-900/30' },
  basic: { Component: BasicTemplate, generateHTML: generateBasicHTML, icon: FileText, baseColor: 'from-gray-500/20 to-gray-900/20' },
  newsletter: { Component: NewsletterTemplate, generateHTML: generateNewsletterHTML, icon: Mail, baseColor: 'from-red-500/20 to-red-900/20' },
  transaction: { Component: TransactionTemplate, generateHTML: generateTransactionHTML, icon: ShoppingCart, baseColor: 'from-green-500/20 to-green-900/20' },
  welcome: { Component: WelcomeTemplate, generateHTML: generateWelcomeHTML, icon: UserPlus, baseColor: 'from-blue-500/20 to-blue-900/20' },
  password: { Component: PasswordResetTemplate, generateHTML: generatePasswordResetHTML, icon: KeyRound, baseColor: 'from-orange-500/20 to-orange-900/20' }
};

export const EmailTemplatePage = () => {
  // Load saved variants from localStorage
  const loadSavedVariants = () => {
    try {
      const saved = localStorage.getItem('tfd_template_variants');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const loadSavedData = () => {
    try {
      const saved = localStorage.getItem('tfd_template_data');
      return saved ? { ...defaultTemplateData, ...JSON.parse(saved) } : defaultTemplateData;
    } catch {
      return defaultTemplateData;
    }
  };

  const [customVariants, setCustomVariants] = useState(loadSavedVariants);
  const [templateData, setTemplateData] = useState(loadSavedData);
  
  // Combine base templates with custom variants
  const allTemplates = [...baseTemplates, ...customVariants];
  
  const [selectedTemplate, setSelectedTemplate] = useState(allTemplates[0]);
  const [viewMode, setViewMode] = useState('preview');
  const [deviceView, setDeviceView] = useState('desktop');
  const [copied, setCopied] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAll, setUploadingAll] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingName, setEditingName] = useState(null);
  const [tempName, setTempName] = useState('');

  // Save variants to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tfd_template_variants', JSON.stringify(customVariants));
  }, [customVariants]);

  // Save template data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('tfd_template_data', JSON.stringify(templateData));
  }, [templateData]);

  const currentData = templateData[selectedTemplate.id] || templateData[selectedTemplate.baseType] || {};

  const handleDataChange = (field, value) => {
    setTemplateData(prev => ({
      ...prev,
      [selectedTemplate.id]: {
        ...prev[selectedTemplate.id],
        [field]: value
      }
    }));
  };

  const handleDuplicateTemplate = (template) => {
    const baseType = template.baseType || template.id;
    const baseData = templateData[template.id] || templateData[baseType] || defaultTemplateData[baseType] || {};
    const timestamp = Date.now();
    const newId = `${baseType}_copy_${timestamp}`;
    
    // Count existing copies for naming
    const existingCopies = customVariants.filter(v => v.baseType === baseType).length;
    const copyNumber = existingCopies + 1;
    
    const typeInfo = templateTypeMap[baseType];
    
    const newVariant = {
      id: newId,
      name: `${template.name} (Kopie ${copyNumber})`,
      description: 'Eigene Variante',
      icon: typeInfo.icon,
      Component: typeInfo.Component,
      generateHTML: typeInfo.generateHTML,
      color: typeInfo.baseColor,
      baseType: baseType,
      isCustom: true
    };
    
    // Copy the template data
    setTemplateData(prev => ({
      ...prev,
      [newId]: { ...baseData }
    }));
    
    setCustomVariants(prev => [...prev, newVariant]);
    setSelectedTemplate(newVariant);
    setShowEditor(true);
    toast.success(`"${template.name}" wurde dupliziert!`);
  };

  const handleDeleteVariant = (variantId) => {
    const variant = customVariants.find(v => v.id === variantId);
    if (!variant) return;
    
    setCustomVariants(prev => prev.filter(v => v.id !== variantId));
    setTemplateData(prev => {
      const newData = { ...prev };
      delete newData[variantId];
      return newData;
    });
    
    // Select the first template if the deleted one was selected
    if (selectedTemplate.id === variantId) {
      setSelectedTemplate(baseTemplates[0]);
    }
    
    toast.success(`"${variant.name}" wurde gelöscht`);
  };

  const handleRenameVariant = (variantId, newName) => {
    setCustomVariants(prev => prev.map(v => 
      v.id === variantId ? { ...v, name: newName } : v
    ));
    setEditingName(null);
    setTempName('');
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
          template_name: `TFD - ${selectedTemplate.name}${currentData.lastChance ? ' - Letzte Chance' : ''}`,
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
    
    for (const template of allTemplates) {
      try {
        const data = templateData[template.id] || templateData[template.baseType] || {};
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
                {allTemplates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate.id === template.id;
                  const isCustom = template.isCustom;
                  return (
                    <div key={template.id} className="relative group">
                      <button
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
                          <div className="flex-1 min-w-0">
                            {editingName === template.id ? (
                              <Input
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onBlur={() => handleRenameVariant(template.id, tempName)}
                                onKeyDown={(e) => e.key === 'Enter' && handleRenameVariant(template.id, tempName)}
                                className="h-6 text-sm"
                                autoFocus
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : (
                              <p className={`font-medium truncate ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                {template.name}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {isCustom ? 'Eigene Variante' : template.description}
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Action buttons on hover */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => { e.stopPropagation(); handleDuplicateTemplate(template); }}
                          title="Duplizieren"
                        >
                          <CopyPlus className="h-3.5 w-3.5" />
                        </Button>
                        {isCustom && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setEditingName(template.id); 
                                setTempName(template.name); 
                              }}
                              title="Umbenennen"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={(e) => { e.stopPropagation(); handleDeleteVariant(template.id); }}
                              title="Löschen"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
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
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDuplicateTemplate(selectedTemplate)}
                        className="flex items-center gap-2"
                      >
                        <CopyPlus className="h-4 w-4" />
                        Duplizieren
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setShowEditor(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(selectedTemplate.id === 'blackweek' || selectedTemplate.baseType === 'blackweek') && (
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
                        <CountdownFields data={currentData} onChange={handleDataChange} />
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
                    {(selectedTemplate.id === 'blackweekcredits' || selectedTemplate.baseType === 'blackweekcredits') && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="headline">Headline</Label>
                          <Input
                            id="headline"
                            value={currentData.headline || ''}
                            onChange={(e) => handleDataChange('headline', e.target.value)}
                            placeholder="BLACK WEEK"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subheadline">Subheadline</Label>
                          <Input
                            id="subheadline"
                            value={currentData.subheadline || ''}
                            onChange={(e) => handleDataChange('subheadline', e.target.value)}
                            placeholder="EXKLUSIV FÜR BESTANDSKUNDEN"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="mainTitle">Haupttitel</Label>
                          <Input
                            id="mainTitle"
                            value={currentData.mainTitle || ''}
                            onChange={(e) => handleDataChange('mainTitle', e.target.value)}
                            placeholder="15% auf alle Credits"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="mainSubtitle">Untertitel</Label>
                          <Input
                            id="mainSubtitle"
                            value={currentData.mainSubtitle || ''}
                            onChange={(e) => handleDataChange('mainSubtitle', e.target.value)}
                            placeholder="Ihr Treue-Bonus. Nur diese Woche."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="greeting">Begrüßung</Label>
                          <Input
                            id="greeting"
                            value={currentData.greeting || ''}
                            onChange={(e) => handleDataChange('greeting', e.target.value)}
                            placeholder="Hallo"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Kundenname</Label>
                          <Input
                            id="customerName"
                            value={currentData.customerName || ''}
                            onChange={(e) => handleDataChange('customerName', e.target.value)}
                            placeholder="geschätzter Kunde"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="introText">Intro Text</Label>
                          <Textarea
                            id="introText"
                            value={currentData.introText || ''}
                            onChange={(e) => handleDataChange('introText', e.target.value)}
                            placeholder="Als treuer Kunde erhalten Sie..."
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discountBadge">Rabatt Badge</Label>
                          <Input
                            id="discountBadge"
                            value={currentData.discountBadge || ''}
                            onChange={(e) => handleDataChange('discountBadge', e.target.value)}
                            placeholder="15% RABATT"
                          />
                        </div>
                        <CountdownFields data={currentData} onChange={handleDataChange} />
                        <div className="space-y-2">
                          <Label htmlFor="ctaText">Button Text</Label>
                          <Input
                            id="ctaText"
                            value={currentData.ctaText || ''}
                            onChange={(e) => handleDataChange('ctaText', e.target.value)}
                            placeholder="JETZT IM PORTAL EINLOGGEN"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ctaUrl">Button Link</Label>
                          <Input
                            id="ctaUrl"
                            value={currentData.ctaUrl || ''}
                            onChange={(e) => handleDataChange('ctaUrl', e.target.value)}
                            placeholder="https://portal.tuningfiles-download.com/"
                          />
                        </div>
                      </>
                    )}
                    {(selectedTemplate.id === 'newsletter' || selectedTemplate.baseType === 'newsletter') && (
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
                    {(selectedTemplate.id === 'welcome' || selectedTemplate.id === 'password' || selectedTemplate.id === 'transaction' || selectedTemplate.baseType === 'welcome' || selectedTemplate.baseType === 'password' || selectedTemplate.baseType === 'transaction') && (
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
                        {(selectedTemplate.id === 'transaction' || selectedTemplate.baseType === 'transaction') && (
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
                    {(selectedTemplate.id === 'basic' || selectedTemplate.baseType === 'basic') && (
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

              {/* Listmonk Variables Info */}
              <Card className="bg-card border-border md:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Tag className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-2">Listmonk Personalisierung</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <code className="bg-muted px-2 py-1 rounded text-muted-foreground">{'{{ .Subscriber.FirstName }}'}</code>
                        <code className="bg-muted px-2 py-1 rounded text-muted-foreground">{'{{ .Subscriber.LastName }}'}</code>
                        <code className="bg-muted px-2 py-1 rounded text-muted-foreground">{'{{ .Subscriber.Email }}'}</code>
                        <code className="bg-muted px-2 py-1 rounded text-muted-foreground">{'{{ .Subscriber.Name }}'}</code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Mit <code className="bg-muted px-1 rounded">{'| default "Fallback"'}</code> für Standardwerte
                      </p>
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
