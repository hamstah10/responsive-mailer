import React, { useState } from 'react';
import { Copy, Check, Mail, ShoppingCart, UserPlus, KeyRound, Eye, Code, Download, Smartphone, Monitor, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  generateBasicHTML
} from '@/components/email-templates';

const templates = [
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

  const handleCopyHTML = async () => {
    const html = selectedTemplate.generateHTML();
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
    const html = selectedTemplate.generateHTML();
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

  const SelectedComponent = selectedTemplate.Component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_2fe42aa5-9907-4512-808b-ab78c4c0f3e9/artifacts/o55o7ha0_logo_tuning.png" 
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
                    <div className="w-8 h-8 rounded-md" style={{ backgroundColor: '#bd1f22' }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">#bd1f22</p>
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
                    <SelectedComponent />
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
                    <code>{selectedTemplate.generateHTML()}</code>
                  </pre>
                </div>
              </div>
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
                src="https://customer-assets.emergentagent.com/job_2fe42aa5-9907-4512-808b-ab78c4c0f3e9/artifacts/o55o7ha0_logo_tuning.png" 
                alt="TuningFiles Download" 
                className="h-6 w-auto opacity-60"
              />
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} TuningFiles Download
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/tuningfiles" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="https://facebook.com/tuningfiles" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
              <a href="https://wa.me/tuningfiles" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
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
