# BIGJOE LIBRARY 📚

A beautiful digital library app inspired by Libby, built with React, Vite, and TailwindCSS. Discover, borrow, and enjoy ebooks and audiobooks with an intuitive, library-themed interface.

![BIGJOE LIBRARY Screenshot](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center)

## ✨ Features

### 📖 Core Reading Experience
- **Discover Page**: Browse curated shelves (New Releases, Popular, Staff Picks)
- **Smart Search**: Find books by title, author, or genre with library switching
- **Ebook Reader**: Full-featured reading modal with page navigation and progress tracking
- **Audiobook Player**: Beautiful player with play/pause, skip controls, and mini dock

### 📚 Library Management
- **Loans**: Track borrowed books with due dates and return options
- **Holds**: Manage holds with queue position and estimated wait times
- **Tags**: Organize books with custom tags (Favorites, To Read, Finished)
- **Local Storage**: Persistent state for loans, holds, and tags

### 🎨 Beautiful Design
- **Library-Inspired Theme**: Warm teals, library golds, and cozy reading colors
- **Responsive Layout**: Desktop sidebar + mobile bottom tabs
- **Design System**: Semantic color tokens and consistent theming
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

### 📱 Modern Interface
- **Mobile-First**: Responsive grid layouts and touch-friendly controls
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation
- **Performance**: Optimized with React + Vite for fast loading

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open [http://localhost:8080](http://localhost:8080) to view the app.

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui components
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State**: React hooks + Local Storage
- **Data Fetching**: TanStack Query

## 📱 App Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── BookCard.tsx     # Book display with actions
│   ├── Shelf.tsx        # Book collection display
│   ├── ReaderModal.tsx  # Ebook reading interface
│   └── AudioPlayer.tsx  # Audiobook player
├── pages/               # Main app pages
│   ├── Discover.tsx     # Browse and search books
│   ├── Loans.tsx        # Borrowed books
│   ├── Holds.tsx        # Books on hold
│   ├── Tags.tsx         # Tagged collections
│   └── Settings.tsx     # User preferences
├── data/
│   └── mockBooks.ts     # Sample book data
├── hooks/
│   └── useLocalStorage.ts # Persistent state hook
└── lib/
    └── utils.ts         # Utility functions
```

## 🎨 Design System

The app uses a carefully crafted design system with library-inspired colors:

- **Primary**: Deep teal (`hsl(185 84% 25%)`) - Classic library book spines
- **Secondary**: Warm paper (`hsl(35 25% 92%)`) - Aged book pages  
- **Accent**: Library gold (`hsl(25 85% 60%)`) - Vintage book details
- **Success**: Forest green (`hsl(140 65% 45%)`) - Available books

### Custom Design Tokens

```css
--gradient-hero: Deep teal gradient for headers
--gradient-shelf: Subtle paper gradient for shelves  
--gradient-book: Clean white gradient for book cards
--shadow-book: Elevated book card shadows
--shadow-shelf: Subtle shelf container shadows
```

## 📖 Usage Guide

### Discovering Books
1. **Browse Shelves**: Scroll through curated collections
2. **Search**: Use the search bar with library switching
3. **Filter**: Quick filter by genre, format, or availability
4. **Borrow/Hold**: Click actions on book cards

### Reading & Listening  
1. **Ebook Reader**: Click "Read" to open full-screen reader
2. **Audiobook Player**: Click "Listen" for playback controls
3. **Progress Tracking**: Automatic bookmark and progress saving
4. **Mini Player**: Minimize audiobook player for background listening

### Organization
1. **Loans**: View borrowed books with due dates
2. **Holds**: Track holds with queue positions
3. **Tags**: Create custom collections (Favorites, To Read, etc.)
4. **Settings**: Customize reading preferences and account

## 🔧 Customization

### Adding New Books
Edit `src/data/mockBooks.ts` to add more sample books:

```typescript
export const mockBooks: Book[] = [
  {
    id: 'unique-id',
    title: 'Book Title',
    author: 'Author Name',
    coverUrl: '/path/to/cover.jpg',
    description: 'Book description...',
    genre: 'Fiction',
    type: 'both', // 'ebook' | 'audiobook' | 'both'
    available: true,
    rating: 4.5,
    // ... other properties
  }
];
```

### Theming
Customize colors in `src/index.css`:

```css
:root {
  --primary: 185 84% 25%;     /* Your brand color */
  --accent: 25 85% 60%;       /* Accent color */
  --library-gold: 45 90% 65%; /* Custom tokens */
}
```

### Components
All components use the design system and are fully customizable. Override variants in component files or create new ones.

## 🎯 Roadmap

- [ ] **Real Library Integration**: Connect to library APIs (Overdrive, Hoopla)
- [ ] **User Accounts**: Authentication and cloud sync
- [ ] **Advanced Reader**: Highlighting, notes, and bookmarks
- [ ] **Offline Mode**: Download books for offline reading
- [ ] **Social Features**: Reviews, ratings, and recommendations
- [ ] **Accessibility**: Enhanced screen reader support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Libby by Overdrive** - Design inspiration
- **shadcn/ui** - Beautiful component library
- **Lucide** - Clean, consistent icons
- **Unsplash** - High-quality images

---

**Happy Reading!** 📖✨

Built with ❤️ for book lovers everywhere.
