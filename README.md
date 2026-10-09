# SharePal: Gaming Gadgets on Rent (Bangalore) recreation

Vite + React + TypeScript + Tailwind CSS.

## Run
    npm install
    npm run dev       # http://localhost:5173
    npm run build && npm run preview

## Deploy
Import the repo into Vercel or Netlify. Build command `npm run build`, output directory `dist`.

## Structure
- `src/data/products.json`: product data (trimmed from the provided product-list)
- `src/components/`: Header, CategoryTabs, Sidebar, Banner, PromoBanners, Toolbar, ProductCard, FAQ, Breadcrumb, Reviews, Footer, ChatButton, BottomNav
- `src/lib/`: categories (sidebar filters), footer links, formatting
- `tailwind.config.js`: design tokens (colors, radius, shadows, font)

## Improvements beyond the original
- Search, sort and "Available only" filter
- Sidebar categories filter the grid; filters are stored in the URL so a view can be shared
- Working cart: the + button toggles an item and the header shows a count
- Count-up animation for the stats; reviews marquee pauses on hover
- Image skeletons and graceful image-failure state
- Clear empty state with a reset button
- Keyboard focus styles, ARIA labels, accessible accordions, reduced-motion support

## Data notes
- Card price: uses `rent_5_days` when present in the JSON, otherwise estimates per-day x 5 + 18% GST
- Sidebar categories match on product name (GTA, PS5, Xbox, VR/Oculus, Wheel). Drop the full product JSON into `src/data/products.json` and they populate
- Banner artwork, logos and FAQ answers are placeholders to be replaced with the original assets and text

## Responsive behaviour (mirrors the original)
- < 768px: 2-column grid, white cards with an "Add to Cart" button, purple header block (header + tabs + banner), bottom nav bar, vertical sidebar (76-100px)
- 768px: 3-column grid, banner moves next to the sidebar, round + button, whole-card hover
- 1024px+: 4-column grid, full header pill with delivery/pickup dates, search/cart/login
- Header hides on scroll down and returns on scroll up (< 1024px); tabs stay sticky
- Default order: Vote to Launch, then New, then the rest
