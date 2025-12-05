// Mock database for working with the article object
export type Article = {
    id: string;
    title: string;
    imageUrl: string;
  };
  
export const db: Article[] = [];