export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  genre: string;
  publishDate: string;
  duration?: string; // for audiobooks
  pages?: number; // for ebooks
  type: 'ebook' | 'audiobook' | 'both';
  available: boolean;
  rating: number;
  tags: string[];
}

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: '/placeholder.svg',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever.',
    genre: 'Fiction',
    publishDate: '2020-08-13',
    pages: 288,
    type: 'both',
    available: true,
    rating: 4.2,
    tags: []
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: '/placeholder.svg',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    genre: 'Self-Help',
    publishDate: '2018-10-16',
    duration: '5h 35m',
    pages: 320,
    type: 'both',
    available: true,
    rating: 4.7,
    tags: []
  },
  {
    id: '3',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverUrl: '/placeholder.svg',
    description: 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.',
    genre: 'Fiction',
    publishDate: '2017-06-13',
    pages: 400,
    type: 'ebook',
    available: false,
    rating: 4.5,
    tags: []
  },
  {
    id: '4',
    title: 'Educated',
    author: 'Tara Westover',
    coverUrl: '/placeholder.svg',
    description: 'A Memoir',
    genre: 'Biography',
    publishDate: '2018-02-20',
    duration: '12h 10m',
    pages: 334,
    type: 'both',
    available: true,
    rating: 4.4,
    tags: []
  },
  {
    id: '5',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverUrl: '/placeholder.svg',
    description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller.',
    genre: 'Science Fiction',
    publishDate: '2021-05-04',
    duration: '16h 10m',
    pages: 496,
    type: 'audiobook',
    available: true,
    rating: 4.6,
    tags: []
  },
  {
    id: '6',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    coverUrl: '/placeholder.svg',
    description: 'In a peaceful retirement village, four unlikely friends meet weekly in the Jigsaw Room to discuss unsolved crimes.',
    genre: 'Mystery',
    publishDate: '2020-09-03',
    pages: 368,
    type: 'ebook',
    available: true,
    rating: 4.1,
    tags: []
  }
];

export const shelves = [
  {
    id: 'new-releases',
    title: 'New Releases',
    books: mockBooks.slice(0, 4)
  },
  {
    id: 'popular',
    title: 'Popular Now',
    books: mockBooks.slice(1, 5)
  },
  {
    id: 'staff-picks',
    title: 'Staff Picks',
    books: mockBooks.slice(2, 6)
  }
];