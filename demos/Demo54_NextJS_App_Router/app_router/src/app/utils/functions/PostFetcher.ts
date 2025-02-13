import PostFetcherArgumentsType from "../types/PostFetcherArgumentsType";

// Modified Custom Post Fetcher function
export default async function PostFetcher(url: string, { arg }: { arg: PostFetcherArgumentsType }) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    });
  
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
  
    return response.json();
}