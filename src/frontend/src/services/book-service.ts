import { BookDto } from "../models/book/BookDTO";
import { CreateBookDto } from "../models/book/CreateBookDTO";

const API_URL = "https://localhost:7202/api/books";

// Tüm kitapları getir
export const fetchBooks = async (onSuccess: (data: BookDto[]) => void) => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    onSuccess(data);
  } catch (err) {
    console.error("Kitaplar alınamadı:", err);
  }
};

// Kategoriye göre kitap getir
export const fetchBookByCategory = async (
  selectedCategory: number,
  onSuccess: (data: BookDto[]) => void
) => {
  try {
    const res = await fetch(`${API_URL}/byCategory/${selectedCategory}`);
    const data = await res.json();
    onSuccess(data);
  } catch (error) {
    console.error("Kitaplar alınamadı:", error);
  }
};

// Yeni kitap oluştur
export const createBook = async (book: CreateBookDto) => {
  console.log("📅 publishDate değeri:", book.publishDate);

  let formattedDate = "";

  if (book.publishDate && !isNaN(Date.parse(book.publishDate))) {
    formattedDate = new Date(book.publishDate).toISOString();
  } else {
    throw new Error("Geçersiz tarih! publishDate: " + book.publishDate);
  }

  const sanitizedBook = {
    ...book,
    publishDate: formattedDate,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify(sanitizedBook),
  });

  if (!response.ok) {
    console.error("❌ Backend cevabı:", await response.text());
    throw new Error("Kitap eklenemedi");
  }
};

export const deleteBook = async (id: number) => {
    const response = await fetch(`https://localhost:7202/api/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
  
    if (!response.ok) {
      const err = await response.text();
      console.error("❌ Silme hatası:", err);
      throw new Error("Kitap silinemedi");
    }
  };
  
