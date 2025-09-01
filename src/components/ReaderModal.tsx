import { useState } from 'react';
import { Book } from '@/data/mockBooks';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, X, Settings, BookOpen } from 'lucide-react';

interface ReaderModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReaderModal({ book, isOpen, onClose }: ReaderModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = book?.pages || 100;
  const progress = (currentPage / totalPages) * 100;

  if (!book) return null;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <DialogTitle className="text-lg">{book.title}</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Reading Area */}
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-book">
          <div className="max-w-2xl mx-auto space-y-4 text-foreground leading-relaxed">
            <h2 className="text-xl font-semibold mb-6">Chapter {Math.ceil(currentPage / 10)}</h2>
            <p>
              This is a sample reading view for "{book.title}" by {book.author}. 
              In a real implementation, this would display the actual book content 
              from your digital library provider.
            </p>
            <p>
              {book.description}
            </p>
            <p>
              The reading interface would include features like:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Font size and family adjustment</li>
              <li>Background color themes (sepia, dark mode, etc.)</li>
              <li>Line spacing controls</li>
              <li>Bookmarking and highlighting</li>
              <li>Table of contents navigation</li>
              <li>Search within the book</li>
            </ul>
            <p>
              Current page: {currentPage} of {totalPages}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="border-t p-4 bg-card">
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              {Math.round(progress)}% complete
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}