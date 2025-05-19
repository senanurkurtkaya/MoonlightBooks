export type BookDto = {
    id: number;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    categoryName: string;
    publishDate?: string; 
    imageUrl?: string;// optional burada
  };