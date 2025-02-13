// Custom fetcher function to be used for working with requests, client-side
export default async function GenericFetcher(url: string) {
    const res = await fetch(url); // Authorize Fetch Request

    // Check response status
    if (!res.ok) {
        throw new Error('An error occurred while fetching the data.');
    }
    
    // Return data
    return res.json();
}