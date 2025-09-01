import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  Clock, 
  Hash, 
  Settings as SettingsIcon,
  Menu
} from "lucide-react";

import { Book } from "@/data/mockBooks";
import { Discover } from "@/pages/Discover";
import { Loans } from "@/pages/Loans";
import { Holds } from "@/pages/Holds";
import { Tags } from "@/pages/Tags";
import { Settings } from "@/pages/Settings";
import { ReaderModal } from "@/components/ReaderModal";
import { AudioPlayer } from "@/components/AudioPlayer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRead = (book: Book) => {
    setCurrentBook(book);
    setIsReaderOpen(true);
  };

  const handleListen = (book: Book) => {
    setCurrentBook(book);
    setIsPlayerOpen(true);
    setIsPlayerMinimized(false);
  };

  const tabs = [
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'loans', label: 'Loans', icon: BookOpen },
    { id: 'holds', label: 'Holds', icon: Clock },
    { id: 'tags', label: 'Tags', icon: Hash },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <Discover onRead={handleRead} onListen={handleListen} />;
      case 'loans':
        return <Loans onRead={handleRead} onListen={handleListen} />;
      case 'holds':
        return <Holds onRead={handleRead} onListen={handleListen} />;
      case 'tags':
        return <Tags onRead={handleRead} onListen={handleListen} />;
      case 'settings':
        return <Settings />;
      default:
        return <Discover onRead={handleRead} onListen={handleListen} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-40 bg-background border-b">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                BIGJOE LIBRARY
              </h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <Card className="m-4 shadow-floating">
                <CardContent className="p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {tabs.map((tab) => (
                      <Button
                        key={tab.id}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className="justify-start"
                        onClick={() => {
                          setActiveTab(tab.id);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <tab.icon className="h-4 w-4 mr-2" />
                        {tab.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col w-64 min-h-screen border-r bg-gradient-shelf">
              <div className="p-6 border-b">
                <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  BIGJOE LIBRARY
                </h1>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:overflow-auto">
              <main className="p-4 lg:p-8 pb-20 lg:pb-8">
                {renderContent()}
              </main>
            </div>
          </div>

          {/* Bottom Tab Bar - Mobile */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
            <div className="grid grid-cols-5">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`h-16 flex-col gap-1 rounded-none ${
                    activeTab === tab.id ? 'text-primary bg-primary/10' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="text-xs">{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Modals */}
          <ReaderModal
            book={currentBook}
            isOpen={isReaderOpen}
            onClose={() => setIsReaderOpen(false)}
          />
          
          <AudioPlayer
            book={currentBook}
            isOpen={isPlayerOpen}
            onClose={() => setIsPlayerOpen(false)}
            isMinimized={isPlayerMinimized}
            onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)}
          />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
