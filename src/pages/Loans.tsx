import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockBooks, Book } from '@/data/mockBooks';
import { BookCard } from '@/components/BookCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar } from 'lucide-react';

interface LoansProps {
  onRead: (book: Book) => void;
  onListen: (book: Book) => void;
}

export function Loans({ onRead, onListen }: LoansProps) {
  const [loans] = useLocalStorage<string[]>('bigjoe-loans', []);
  
  const loanedBooks = mockBooks.filter(book => loans.includes(book.id));

  const getDueDate = (bookId: string) => {
    // Mock due date - 14 days from "loan date"
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    return dueDate.toLocaleDateString();
  };

  if (loanedBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <BookOpen className="h-16 w-16 text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">No current loans</h3>
          <p className="text-muted-foreground max-w-md">
            Borrow books from the Discover page to start reading or listening to your favorite titles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">My Loans</h1>
        <p className="text-muted-foreground">
          {loanedBooks.length} {loanedBooks.length === 1 ? 'book' : 'books'} currently borrowed
        </p>
      </div>

      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <BookOpen className="h-5 w-5" />
            Current Loans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loanedBooks.map((book) => (
              <div key={book.id} className="space-y-3">
                <BookCard 
                  book={book} 
                  onRead={onRead}
                  onListen={onListen}
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Due: {getDueDate(book.id)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}