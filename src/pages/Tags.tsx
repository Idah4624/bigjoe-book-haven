import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { mockBooks, Book } from '@/data/mockBooks';
import { BookCard } from '@/components/BookCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Tags as TagsIcon, Plus, Hash } from 'lucide-react';

interface TagsProps {
  onRead: (book: Book) => void;
  onListen: (book: Book) => void;
}

interface BookTag {
  bookId: string;
  tags: string[];
}

export function Tags({ onRead, onListen }: TagsProps) {
  const [bookTags, setBookTags] = useLocalStorage<BookTag[]>('bigjoe-tags', []);
  const [newTag, setNewTag] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(
    new Set(bookTags.flatMap(bt => bt.tags))
  ).sort();

  // Get books for selected tag
  const getBooksWithTag = (tag: string) => {
    const bookIds = bookTags
      .filter(bt => bt.tags.includes(tag))
      .map(bt => bt.bookId);
    return mockBooks.filter(book => bookIds.includes(book.id));
  };

  // Add tag to book
  const addTagToBook = (bookId: string, tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (!trimmedTag) return;

    setBookTags(prev => {
      const existing = prev.find(bt => bt.bookId === bookId);
      if (existing) {
        if (!existing.tags.includes(trimmedTag)) {
          return prev.map(bt =>
            bt.bookId === bookId
              ? { ...bt, tags: [...bt.tags, trimmedTag] }
              : bt
          );
        }
        return prev;
      } else {
        return [...prev, { bookId, tags: [trimmedTag] }];
      }
    });
  };

  // Remove tag from book
  const removeTagFromBook = (bookId: string, tag: string) => {
    setBookTags(prev =>
      prev.map(bt =>
        bt.bookId === bookId
          ? { ...bt, tags: bt.tags.filter(t => t !== tag) }
          : bt
      ).filter(bt => bt.tags.length > 0)
    );
  };

  const predefinedTags = ['favorites', 'to read', 'finished', 'dnf', 'recommended'];

  if (allTags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <TagsIcon className="h-16 w-16 text-muted-foreground" />
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">No tags yet</h3>
          <p className="text-muted-foreground max-w-md">
            Create tags to organize your books. Tag books as favorites, to-read, finished, or create custom collections.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Start Tagging
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Tags to Books</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {mockBooks.map(book => (
                  <div key={book.id} className="space-y-2">
                    <div className="text-sm font-medium">{book.title}</div>
                    <div className="text-xs text-muted-foreground">{book.author}</div>
                    <div className="flex flex-wrap gap-1">
                      {predefinedTags.map(tag => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => addTagToBook(book.id, tag)}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">My Tags</h1>
        <p className="text-muted-foreground">
          Organize your books with custom tags
        </p>
      </div>

      {/* Tag Navigation */}
      <Card className="shadow-shelf">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-library-spine">
            <Hash className="h-5 w-5" />
            Collections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All Tags ({allTags.length})
            </Button>
            {allTags.map(tag => {
              const count = getBooksWithTag(tag).length;
              return (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="flex items-center gap-2"
                >
                  {tag}
                  <Badge variant="secondary" className="text-xs">
                    {count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tag Content */}
      {selectedTag ? (
        <Card className="shadow-shelf">
          <CardHeader>
            <CardTitle className="capitalize">#{selectedTag}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getBooksWithTag(selectedTag).map(book => (
                <div key={book.id} className="space-y-2">
                  <BookCard 
                    book={book} 
                    onRead={onRead}
                    onListen={onListen}
                  />
                  <div className="flex flex-wrap gap-1">
                    {bookTags
                      .find(bt => bt.bookId === book.id)
                      ?.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeTagFromBook(book.id, tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))
                    }
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {allTags.map(tag => {
            const taggedBooks = getBooksWithTag(tag);
            return (
              <Card key={tag} className="shadow-shelf">
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    #{tag}
                    <Badge variant="outline">{taggedBooks.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {taggedBooks.slice(0, 6).map(book => (
                      <BookCard 
                        key={book.id} 
                        book={book} 
                        onRead={onRead}
                        onListen={onListen}
                      />
                    ))}
                  </div>
                  {taggedBooks.length > 6 && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setSelectedTag(tag)}
                    >
                      View all {taggedBooks.length} books
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}