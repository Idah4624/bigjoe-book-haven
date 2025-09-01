import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { shelves } from '@/data/mockBooks';
import { Shelf } from '@/components/Shelf';
import { Book } from '@/data/mockBooks';

interface DiscoverProps {
  onRead: (book: Book) => void;
  onListen: (book: Book) => void;
}

export function Discover({ onRead, onListen }: DiscoverProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLibrary, setSelectedLibrary] = useState('Main Library');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          BIGJOE LIBRARY
        </h1>
        <p className="text-muted-foreground">
          Discover your next great read or listen
        </p>
      </div>

      {/* Search and Library Selector */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search books, authors, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            {selectedLibrary}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            New Releases
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            Fiction
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            Non-Fiction
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            Audiobooks
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            Available Now
          </Badge>
        </div>
      </div>

      {/* Shelves */}
      <div className="space-y-8">
        {shelves.map((shelf) => (
          <Shelf
            key={shelf.id}
            title={shelf.title}
            books={shelf.books}
            onRead={onRead}
            onListen={onListen}
          />
        ))}
      </div>
    </div>
  );
}