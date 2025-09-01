import { useState, useRef, useEffect } from 'react';
import { Book } from '@/data/mockBooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  X,
  Minimize2,
  Maximize2,
  Headphones
} from 'lucide-react';

interface AudioPlayerProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export function AudioPlayer({ book, isOpen, onClose, isMinimized, onToggleMinimize }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (book?.duration) {
      // Parse duration string like "5h 35m" to seconds
      const parts = book.duration.match(/(\d+)h\s*(\d+)m/);
      if (parts) {
        const hours = parseInt(parts[1]);
        const minutes = parseInt(parts[2]);
        setDuration(hours * 3600 + minutes * 60);
      }
    }
  }, [book]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  if (!book) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 15));
  };

  const skipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 15));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-floating z-50 bg-gradient-hero text-primary-foreground">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">
              <Headphones className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{book.title}</h4>
              <p className="text-xs opacity-80 truncate">{book.author}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={togglePlay} className="text-primary-foreground hover:bg-white/10">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggleMinimize} className="text-primary-foreground hover:bg-white/10">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-primary-foreground hover:bg-white/10">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-2 h-1" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Headphones className="h-5 w-5 text-primary" />
            <DialogTitle>Now Playing</DialogTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Book Cover */}
          <div className="aspect-square w-48 mx-auto bg-library-shelf rounded-lg flex items-center justify-center">
            <Headphones size={48} className="text-muted-foreground" />
          </div>

          {/* Book Info */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-muted-foreground">by {book.author}</p>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="sm" onClick={skipBackward}>
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              size="lg" 
              onClick={togglePlay} 
              className="w-12 h-12 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            
            <Button variant="outline" size="sm" onClick={skipForward}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <Volume2 className="h-4 w-4" />
            <Progress value={75} className="flex-1 h-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}