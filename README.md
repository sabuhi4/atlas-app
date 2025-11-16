# Atlas - Event Management Platform

A modern, full-featured event management web application built with React and TypeScript. Atlas enables users to discover, create, and manage events with a comprehensive booking system and intuitive interface.

## Features

### Event Discovery & Management
- Browse and search events with real-time filtering
- Category-based event organization
- Featured events showcase
- Event creation and editing with validation
- Event cancellation with soft-delete functionality
- Advanced sorting (by date, price, status)

### User Experience
- Personalized user greetings
- Favorites system for bookmarking events
- Complete ticket booking flow with seat selection
- Ticket management and viewing
- User profile with dark mode support
- Responsive design optimized for desktop

### Smart Filtering & Pagination
- Filter by category, price range, and status
- Show/hide cancelled events toggle
- "Load More" pagination for optimal performance
- Real-time event count display

## Tech Stack

### Frontend
- React 19 with TypeScript
- Material-UI (MUI) v7 for components
- Tailwind CSS v4 for styling
- React Router v7 for navigation
- TanStack Query v5 for data fetching
- Zustand for state management
- React Hook Form + Zod for form validation

### Backend & Infrastructure
- Supabase (PostgreSQL, Authentication, Real-time)
- Row Level Security (RLS) for data protection
- JWT-based authentication

### Development Tools
- Vite 7 for fast development
- TypeScript 5.9 with strict mode
- ESLint for code quality

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd atlas-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5175`

### Build for Production
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── features/          # Feature-based modules
│   ├── auth/         # Authentication pages
│   ├── events/       # Event CRUD operations
│   ├── bookings/     # Booking flow
│   └── tickets/      # Ticket management
├── components/       # Reusable components
│   ├── cards/       # EventCard
│   ├── guards/      # Route protection
│   ├── navigation/  # AppHeader
│   └── providers/   # App providers
├── hooks/           # Custom React hooks
├── services/        # API service layer
├── store/          # Zustand state management
├── utils/          # Utilities and helpers
└── routes/         # Route configuration
```

## Key Highlights

- Clean, maintainable codebase with TypeScript strict mode
- Feature-based architecture for scalability
- Optimized performance with React Query caching
- Type-safe API calls with Zod validation
- Comprehensive error handling
- Secure authentication with Supabase
- Production-ready code with no console.log statements

## Database Schema

The application uses 5 main tables:
- `events` - Event information and metadata
- `bookings` - User booking records with seat selection
- `favorites` - User-saved favorite events
- `tickets` - Generated tickets for confirmed bookings
- `users` - Extended user profiles

All tables implement Row Level Security (RLS) for data protection.

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## License

This project is built as a portfolio showcase application.
