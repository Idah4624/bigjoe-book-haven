import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockBooks, Book } from '@/data/mockBooks';
import { BookCard } from '@/components/BookCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';

interface HoldsProps {
  onRead: (book: Book) => void;
  onListen: (book: Book) => void;
}

export function Holds({ onRead, onListen }: HoldsProps) {
  const [holds] = useLocalStorage<string[]>('bigjoe-holds', []);
  
  const heldBooks = mockBooks.filter(book => holds.includes(book.id));

  const getEstimatedWait = (bookId: string) => {
    // Mock estimated wait time
    const waitTimes = ['2 weeks', '1 month', '6 weeks', '2 months'];
    return waitTimes[Math.floor(Math.random() * waitTimes.length)];
  };

  const getQueuePosition = (bookId: string) => {
    // Mock queue position
    return Math.floor(Math.random() * 50) + 1;
  };

  if (heldBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <Clock className="h-16 w-16 text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">No holds</h3>
          <p className="text-muted-foreground max-w-md">
            Place holds on popular books that aren't currently available. You'll be notified when they're ready to borrow.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">My Holds</h1>
        <p className="text-muted-foreground">
          {heldBooks.length} {heldBooks.length === 1 ? 'book' : 'books'} on hold
        </p>
      </div>

      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <Clock className="h-5 w-5" />
            Books on Hold
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {heldBooks.map((book) => (
              <div key={book.id} className="space-y-3">
                <BookCard 
                  book={book} 
                  onRead={onRead}
                  onListen={onListen}
                />
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3" />
                    <span>Position #{getQueuePosition(book.id)} in queue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>Estimated wait: {getEstimatedWait(book.id)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}