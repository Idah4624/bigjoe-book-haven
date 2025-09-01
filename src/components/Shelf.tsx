import { Book } from '@/data/mockBooks';
import { BookCard } from './BookCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ShelfProps {
  title: string;
  books: Book[];
  onRead?: (book: Book) => void;
  onListen?: (book: Book) => void;
}

export function Shelf({ title, books, onRead, onListen }: ShelfProps) {
  return (
    <Card className="bg-gradient-shelf shadow-shelf">
      <CardHeader className="pb-4">
        <CardTitle className="text-library-spine text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onRead={onRead}
              onListen={onListen}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}