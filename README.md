# Amicus Frontend - Case Management MVP

A Next.js-based case management system with a Notion-style builder interface and integrated AI panel. Built with React, TypeScript, TanStack Query, Zustand, shadcn/ui, and react-grid-layout.

## Features

### Phase 1: Authentication & Core (Week 1) ✅
- JWT-based authentication
- Login page with secure token handling
- Protected routes with auth middleware
- User session management

### Phase 2: Case Management (Week 1) ✅
- Cases list view with status indicators
- Case detail pages
- Navigation sidebar
- Case-specific routing

### Phase 3: Page Builder (Week 2) ✅
- Notion-style drag-and-drop page builder
- react-grid-layout integration
- Edit/View mode toggle
- Layout persistence with PATCH API

### Phase 4: Asset Library (Week 2) ✅
- Draggable block components
- Asset sidebar with categories
- Multiple block types:
  - Text blocks
  - Heading blocks
  - Forms with dynamic fields
  - Document viewer (PDF support)
  - Task lists
  - AI chat panels

### Phase 5: Dynamic Forms (Week 3) ✅
- Field type support: text, textarea, email, etc.
- Field validation
- Form submission handling

### Phase 6: Documents & Tasks (Week 3) ✅
- Document management pages
- Task tracking with status/priority
- Integration with case context

### Phase 7: AI Integration (Week 4) ✅
- AI conversation interface
- Context-aware chat (case/page/block/doc)
- Message history
- Real-time chat UI

### Phase 8: Firm Management (Week 4) ✅
- Firm settings page
- Team member management
- Page templates library
- Template creation and reuse

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Layout**: react-grid-layout
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── cases/             # Case management pages
│   │   └── [id]/         # Case detail & sub-pages
│   └── firm/              # Firm-level pages
├── components/            # React components
│   ├── auth/             # Auth components
│   ├── blocks/           # Block type components
│   ├── layout/           # Layout components
│   ├── page-builder/     # Page builder components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities and configs
│   ├── api/              # API client & endpoints
│   └── utils/            # Helper functions
├── store/                 # Zustand state stores
└── types/                 # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dikshithreddym/amicus_frontend.git
cd amicus_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API configuration:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_API_VERSION=v1
NEXT_PUBLIC_JWT_STORAGE_KEY=amicus_jwt_token
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

### Authentication
- `/auth/login` - Login page

### Cases
- `/cases` - Cases list
- `/cases/[id]` - Case detail
- `/cases/[id]/pages/[pageId]` - Page builder
- `/cases/[id]/documents` - Document management
- `/cases/[id]/tasks` - Task tracking
- `/cases/[id]/ai` - AI assistant

### Firm Management
- `/firm/settings` - Firm settings
- `/firm/users` - Team management
- `/firm/templates` - Page templates

## API Integration

The application uses a JSON:API-compliant REST API with JWT authentication.

### API Client

```typescript
import { apiClient } from '@/lib/api/client';

// GET request
const response = await apiClient.get('/cases');

// POST request
const response = await apiClient.post('/cases', { data: caseData });

// PATCH request
const response = await apiClient.patch('/cases/123', { data: updates });
```

### API Endpoints

All endpoints are defined in `src/lib/api/endpoints.ts` and organized by resource:
- `authApi` - Authentication
- `casesApi` - Case management
- `pagesApi` - Page operations
- `documentsApi` - Document management
- `tasksApi` - Task operations
- `aiApi` - AI conversations
- `firmApi` - Firm settings
- `templatesApi` - Templates

## State Management

### Zustand Stores

**Auth Store** (`src/store/auth.ts`):
```typescript
import { useAuthStore } from '@/store/auth';

const { user, login, logout } = useAuthStore();
```

**Page Builder Store** (`src/store/page-builder.ts`):
```typescript
import { usePageBuilderStore } from '@/store/page-builder';

const { layout, isEditMode, setEditMode } = usePageBuilderStore();
```

## Page Builder Usage

### Adding New Block Types

1. Define the block type in `src/types/index.ts`
2. Create the block component in `src/components/blocks/`
3. Add the block to `BlockRenderer` in `src/components/page-builder/block-renderer.tsx`
4. Add asset definition in `src/components/page-builder/asset-sidebar.tsx`

### Layout Persistence

Layouts are automatically saved when the "Save Layout" button is clicked. The layout is persisted via:

```typescript
pagesApi.updateLayout(caseId, pageId, layout)
```

## Development

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

## Architecture Decisions

### JSON:API Format
- Standardized API response format
- Consistent error handling
- Built-in pagination support

### JWT Authentication
- Stateless authentication
- Stored in localStorage
- Automatic inclusion in API requests

### Zustand for State
- Lightweight alternative to Redux
- Simple API with React hooks
- Minimal boilerplate

### TanStack Query
- Server state management
- Automatic caching and revalidation
- Optimistic updates support

### react-grid-layout
- Drag-and-drop grid system
- Responsive layout support
- Persistent layout state

## Future Enhancements

- [ ] Real-time collaboration
- [ ] Offline support with service workers
- [ ] Advanced form validation schemas
- [ ] Rich text editor integration
- [ ] File upload progress tracking
- [ ] Keyboard shortcuts
- [ ] Mobile responsive improvements
- [ ] Dark mode support
- [ ] Export/import templates
- [ ] Audit log viewer

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.
