# Demo 58: Page Rendering Strategies

### SSG (Static Site Generation):
- Pre-renders pages at build time.

- The data is fetched during build, and the page is generated as static HTML.

- Best for content that doesn’t change frequently (e.g., blogs, documentation).

### SSR (Server-Side Rendering):
- Fetches data on the server during each request and generates the page dynamically.

- The page is sent to the client with pre-fetched data on each request.

### ISR (Incremental Static Regeneration):
- A hybrid approach that allows static pages to be updated after deployment.

- Pages are statically generated and served from a cache, but can be re-generated in the background after a set interval or on-demand.


### Hydration:
- Hydration is the process where the client-side React application "takes over" the static HTML that was sent from the server.

- It converts the static HTML into interactive React components.

- This process allows the page to become fully interactive, but it can introduce delays or visual flickers if not handled efficiently.


### <code>useSWR</code> (Stale-While-Revalidate):
- A React hook for client-side data fetching, caching, and revalidation.

- SWR fetches data on the client side, caches it, and revalidates it in the background, ensuring the UI is always updated with the latest data.

- Ideal for client-side components that need to fetch dynamic data after the initial page load.

- Works well with SSR, SSG, and ISR: It can be used to keep data fresh after the page is initially loaded, re-fetching it in the background.