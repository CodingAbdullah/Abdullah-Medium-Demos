export const dynamic = "force-dynamic";

// Articles page that fetches and displays articles with images
export default async function ArticlesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`,
    { cache: "no-store" }
  );

  const articles = await res.json();

  // Returning the list of articles already saved to database
  return (
    <div className="max-w-md mx-auto space-y-6">
      {articles.map((a: any) => (
        <div key={a.id}>
          <img src={a.imageUrl} />
          <h2>{a.title}</h2>
        </div>
      ))}
    </div>
  );
}
