// Server-Side Rendering (SSR)
// In Next.js 15, you can implement SSR with no caching with the Fetch API
export default async function SSRPage() {
    // Data caching is not the default behaviour
    // You do not need to provide any options
    // But you can utilize the 'no-store' option to explicitly define this behaviour
    const data = await fetch("https://api.example.com/data", { cache: 'no-store' })
    const posts = await data.json()
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Server-Side Rendered Page</h1>
        <p className="mb-4">This page is rendered on each request (SSR)</p>
        <div className="border p-4 rounded-md bg-gray-50">
          <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
      </div>
    )
  }
  
  // You can also explicitly set dynamic rendering using a named constant dynamic and setting to a value of 'force-dynamic':
  export const dynamic = "force-dynamic"
  
  