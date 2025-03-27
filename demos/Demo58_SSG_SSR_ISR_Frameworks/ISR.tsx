// Incremental Static Regeneration (ISR)
// This page will be generated at build time (SSG) and regenerated after the revalidate period ends 

export default async function ISRPage() {
    // For ISR, set both the cache and next parameters 
    // Like SSG, set the cache option to cache: 'force-cache'
    // Additionally, add the next parameter with a revalidate option
    const data = await fetch("https://api.example.com/data", {
      cache: "force-cache",
      next: { revalidate: 60 }, // Revalidate data every minute (60 seconds)
    })

    const posts = await data.json()
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Incrementally Static Regenerated Page</h1>
        <p className="mb-4">This page is regenerated every 60 seconds (ISR)</p>
        <div className="border p-4 rounded-md bg-gray-50">
          <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
      </div>
    )
  }
  
  // Set the revalidation time for the entire page using a named constant, revalidate with a specific value
  export const revalidate = 60;
  
  