import { useState } from 'react';
import { Book } from '@/data/mockBooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, BookOpen, Star, Play, Headphones } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface BookCardProps {
  book: Book;
  onRead?: (book: Book) => void;
  onListen?: (book: Book) => void;
}

export function BookCard({ book, onRead, onListen }: BookCardProps) {
  const [loans, setLoans] = useLocalStorage<string[]>('bigjoe-loans', []);
  const [holds, setHolds] = useLocalStorage<string[]>('bigjoe-holds', []);
  
  const isLoaned = loans.includes(book.id);
  const isOnHold = holds.includes(book.id);

  const handleBorrow = () => {
    if (book.available && !isLoaned && !isOnHold) {
      setLoans([...loans, book.id]);
    }
  };

  const handleHold = () => {
    if (!book.available && !isOnHold && !isLoaned) {
      setHolds([...holds, book.id]);
    }
  };

  const handleReturn = () => {
    setLoans(loans.filter(id => id !== book.id));
  };

  const handleCancelHold = () => {
    setHolds(holds.filter(id => id !== book.id));
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-book hover:-translate-y-1 bg-gradient-book">
      <CardContent className="p-4">
        <div className="aspect-[3/4] bg-library-shelf rounded-md mb-3 flex items-center justify-center text-muted-foreground">
          <img 
            src={book.coverUrl} 
            alt={book.title}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling!.classList.remove('hidden');
            }}
          />
          <div className="hidden flex-col items-center gap-2">
            <BookOpen size={32} />
            <span className="text-xs text-center px-2">{book.title}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {book.title}
          </h3>
          <p className="text-muted-foreground text-xs">
            by {book.author}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-library-gold text-library-gold" />
              <span>{book.rating}</span>
            </div>
            {book.type === 'audiobook' && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{book.duration}</span>
              </div>
            )}
            {book.type === 'ebook' && (
              <div className="flex items-center gap-1">
                <BookOpen size={12} />
                <span>{book.pages}p</span>
              </div>
            )}
            {book.type === 'both' && (
              <div className="flex items-center gap-2">
                <BookOpen size={12} />
                <Headphones size={12} />
              </div>
            )}
          </div>

          <Badge variant="outline" className="text-xs">
            {book.genre}
          </Badge>

          <div className="flex gap-2 mt-3">
            {isLoaned ? (
              <div className="flex gap-2 w-full">
                {book.type !== 'audiobook' && (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onRead?.(book)}
                  >
                    <BookOpen size={14} className="mr-1" />
                    Read
                  </Button>
                )}
                {book.type !== 'ebook' && (
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => onListen?.(book)}
                  >
                    <Play size={14} className="mr-1" />
                    Listen
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleReturn}
                >
                  Return
                </Button>
              </div>
            ) : isOnHold ? (
              <div className="flex gap-2 w-full">
                <Button variant="secondary" size="sm" className="flex-1" disabled>
                  On Hold
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancelHold}
                >
                  Cancel
                </Button>
              </div>
            ) : book.available ? (
              <Button 
                variant="default" 
                size="sm" 
                className="w-full"
                onClick={handleBorrow}
              >
                Borrow
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handleHold}
              >
                Place Hold
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}