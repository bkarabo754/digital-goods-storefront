🚀 Quick Start
Prerequisites

Node.js 18+
npm/bun/yarn/pnpm

Installation
bash# Clone the repository
git clone <repository-url>
cd digital-goods-storefront

# Install dependencies

bun install

# Run development server

bun dev
Open http://localhost:3000 in your browser.
Build for Production
bash# Create optimized production build
bun run build

# Start production server

bun start

📦 Required Dependencies
bash# Core dependencies
bun install next@15.5.6 react react-dom
bun install zustand immer
bun install tailwindcss postcss autoprefixer
bun install lucide-react
bun install clsx tailwind-merge
bun install sonner

# Development dependencies

bun install -D typescript @types/react @types/node
bun install -D eslint eslint-config-next
bun install -D prettier prettier-plugin-tailwindcss
Shadcn UI Components
bash# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add required components

bunx shadcn-ui@latest add badge button card dialog input select separator sheet scroll-area skeleton

# Add required Icons

ShoppingCart, Star, ShoppingCart as CartIcon, ShoppingBag, Minus, Plus, Trash2, CreditCard, ChevronDown, BookOpen, Search, XIcon

🏗️ Project Structure
src/
├── app/ # Next.js App Router
│ ├── layout.tsx # Root layout with SEO
│ ├── page.tsx # Home page
│ └── globals.css # Global styles
├── (bookstore)/ # Dynamic route
│ ├── components/ # React components
│ ├── BookDetails/ # Book Detail features
│ ├── BookGrid/ # Book Grid features
│ └── Cart/ # Cart features
│ └── Header/ # Header features
│ └── ui/ # Shadcn UI Components
├── store/ # Zustand state management
│ ├── useBookStore.ts # Book store with persistence
│ └── useCartStore.ts # UI state (modals/sheets)
├── data/ # Static data (books.ts)
│ ├── books.ts
├── lib/ # Utility functions
├── types/ # TypeScript definitions

⚡ Features

✅ Zustand middleware for state management
✅ Global state via stores
✅ Code Splitting - Dynamic imports
✅ Persistent Cart - Auto-saves to localStorage
✅ Responsive Design - Mobile-first approach
✅ Type Safety - Full TypeScript coverage
✅ Performance Optimized - Memoization, lazy loading
✅ SEO Ready
✅ Accessibility - ARIA labels, semantic HTML, keyboard navigation

🎯 Key Architectural Decisions
State Management Strategy
Zustand over Context API/Redux because:

Simpler API with less boilerplate
Built-in persistence middleware
Granular subscriptions prevent re-renders
TypeScript-friendly
No Provider wrapper needed

Why No useEffect?
Traditional approach (with useEffect):
typescript// OLD: Manual sync with localStorage
useEffect(() => {
const stored = localStorage.getItem('cart');
setCart(JSON.parse(stored));
}, []);

Benefits for using Zustand:

Cleaner code (no manual sync)
Better performance (optimized updates)
Easier testing (pure functions)
Type-safe by default

Component Architecture
Each major feature is split into:

Main Component - Container logic
Sub-Components - Reusable pieces
Skeleton - Loading states
Index File - Lazy export for code splitting

🔧 Trade-offs & Assumptions
Trade-offs Made

Client-Side Only (SPA)

Pro: Simpler state management, no server complexity
Con: SEO requires proper metadata (implemented via Next.js metadata API)
Decision: Acceptable for bookstore with static content

localStorage for Persistence

Pro: Simple, no backend needed, works offline
Con: Limited to 5-10MB, browser-specific
Decision: Sufficient for cart data, scalable to backend later

Static Book Data

Pro: Fast loading, no API calls
Con: Requires rebuild to update catalog
Decision: Acceptable for MVP, easily replaced with API

No Authentication

Assumption: Guest checkout flow
Future: Add auth with user accounts

No Payment Integration

Assumption: Focus on cart/catalog functionality
Future: Integrate Stripe/PayPal

Assumptions Made

Users primarily browse on desktop/tablet (but mobile-optimized)
Cart persists across sessions (localStorage available)
Book prices in ZAR (South African Rand)
All books available for immediate purchase
No inventory management needed
Single currency, no multi-language support (yet)

Optimization Decisions

Memoization Strategy

React.memo for components that re-render frequently
Zustand selectors for granular state subscriptions
useCallback for event handlers passed as props

Code Splitting

Lazy load modals (BookDetailsModal, ShoppingCart)
Suspense boundaries with skeleton loaders

Image Optimization

Next.js Image component with priority loading
Above-the-fold images prioritized
Below-the-fold lazy loaded

⏱️ Time Spent
Total Time: ~4 hours 30 minutes
Breakdown:

Initial planning & architecture: 30 min
Zustand store setup (Cart + UI): 45 min
Component refactoring (BookCard, BookGrid, etc.): 90 min
Shopping cart implementation: 45 min
Utility functions & types: 30 min
SEO optimization & metadata: 20 min
Documentation & comments: 30 min
Testing & refinement: 20 min

🤖 AI Assistance Disclosure
Claude AI (Anthropic) was used for:

Generated comprehensive JSDoc comments
Formatted README sections

Code Refactoring Assistance

Identified prop drilling instances
Suggested component splitting opportunities

---

Best Practices Verification

How AI Was Used Smartly:

✅ As a code review tool
✅ For documentation polish
✅ As a rubber duck for debugging

---Future Enhancements

Use Zustand for state management
Maintain TypeScript strict mode
Add comprehensive comments

Built using Next.js 15.5.6, Zustand, and TypeScript, TailwindCSS, Shadcn UI
