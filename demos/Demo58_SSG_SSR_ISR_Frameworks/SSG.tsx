// Static Site Generation (SSG)
// In Next.js 15, you can implement caching with Fetch API
export default async function SSGPage() {
    // For implementing SSG, you can utilize the 'force-cache' option
    const data = await fetch("https://api.example.com/data", { cache: "force-cache" });
    const posts = await data.json();
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Static Generated Page</h1>
        <p className="mb-4">This page is generated at build time (SSG)</p>
        <div className="border p-4 rounded-md bg-gray-50">
          <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
      </div>
    )
  }
  
  // You can also explicitly set static rendering using the variable constant, dynamic and 'force-static':
  export const dynamic = "force-static";  