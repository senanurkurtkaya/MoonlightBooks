import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import BookGrid from "../components/BookGrid";
import BookDetailDrawer from "../components/BookDetailDrawer";
import { BookDto } from "../models/book/BookDTO";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl?: string;
  description?: string;
}

const BookPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState<BookDto[]>([]);
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Kitapları getir (arama dahil)
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const query = searchTerm ? `?search=${searchTerm}` : "";
        const res = await fetch(`https://localhost:7202/api/books${query}`);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Kitaplar alınamadı:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>
        Tüm Kitaplar
      </Typography>

      <TextField
        label="Kitap Ara..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <BookGrid
          books={books}
          onAddToCart={() => setSnackbarOpen(true)}
          onDetail={(book) => {
            setSelectedBook(book);
            setDrawerOpen(true);
          }}
        />
      )}

      {/* Sepete ekleme bildirimi */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ backgroundColor: "#4caf50", color: "white" }}
        >
          Ürün sepete eklendi!
        </Alert>
      </Snackbar>

      {/* Drawer: Kitap Detayı */}
      <BookDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        book={selectedBook}
      />
    </Box>
  );
};

export default BookPage;
