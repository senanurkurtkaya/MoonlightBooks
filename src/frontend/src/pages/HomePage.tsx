import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import SliderBanner from "../components/SliderBanner";
import CategoryGrid from "../components/CategoryGrid";
import CategoryDetailDrawer from "../components/CategoryDetailDrawer";
import BookDetailDrawer from "../components/BookDetailDrawer";
import { Authenticated } from "../components/auth/Authenticated";
import { Unauthenticated } from "../components/auth/Unauthenticated";
import FeaturedBooks from "../components/FeaturedBooks";
import { fetchBooks } from "../services/book-service";
import { fetchCategories } from "../services/category-service";
import { CategoryDto } from "../models/category/CategoryDTO";
import { BookDto } from "../models/book/BookDTO";


const HomePage = () => {
  const [books, setBooks] = useState<BookDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDto | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  useEffect(() => {

    fetchBooks((data) => {
      setBooks(data);
    });

    fetchCategories((data) => {
      setCategories(data);
    })
  }, []);

  const handleCategoryDetail = (category: CategoryDto) => {
    setSelectedCategory(category);
    setCategoryDrawerOpen(true);
  };

  const handleBookDetail = (book: BookDto) => {
    setSelectedBook(book);
    setDrawerOpen(true);
  };

  return (
    <Box p={5}>
      <SliderBanner />

      <Authenticated>
        <Typography>Hoşgeldin kullanıcı</Typography>
      </Authenticated>
      <Unauthenticated>
        <Typography>Şimdi kaydol, müthiş fırsatları kaçırma</Typography>
      </Unauthenticated>


      <FeaturedBooks
        books={books}
        onAddToCart={() => setSnackbarOpen(true)}
        onDetail={handleBookDetail}
      />

      <Typography variant="h5" fontWeight="bold" mt={6} mb={2}>
        Kategoriler
      </Typography>
      <CategoryGrid categories={categories} onCategoryClick={handleCategoryDetail} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          icon={false}
          sx={{
            backgroundColor: "#ec5e6f",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Ürün sepete eklendi!
        </Alert>
      </Snackbar>

      <BookDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        book={selectedBook}
      />
      <CategoryDetailDrawer
        open={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
        category={selectedCategory}
      />
    </Box>
  );
};

export default HomePage;
