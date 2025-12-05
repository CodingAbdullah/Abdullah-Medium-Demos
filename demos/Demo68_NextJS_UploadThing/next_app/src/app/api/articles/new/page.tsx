"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageDropzone from "@/components/ImageDropzone";

// New article page component
export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  // Save button for running an API call to create and save a new article to mock database
  const save = async () => {
    await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({ title, imageUrl }),
    });

    router.push("/articles");
  };

  // Setting up the image drop zone
  return (
    <div className="max-w-md mx-auto space-y-4">
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <ImageDropzone onUpload={setImageUrl} />

      {imageUrl && <img src={imageUrl} />}

      <button onClick={save}>Save</button>
    </div>
  );
}
