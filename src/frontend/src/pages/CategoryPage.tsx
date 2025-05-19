import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import BookDetailDrawer from "../components/BookDetailDrawer";
import { fetchBookByCategory } from "../services/book-service";
import { BookDto } from "../models/book/BookDTO";
import { fetchCategories } from "../services/category-service";
import { CategoryDto } from "../models/category/CategoryDTO";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [books, setBooks] = useState<BookDto[]>([]);
  const { addToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDto | null>(null);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(parseInt(categoryId));
    }
  }, [categoryId]);

  useEffect(() => {

    fetchCategories((data) => {
      setCategories(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      fetchBookByCategory(selectedCategory, (data) => {
        setBooks(data);
      });

      console.log(categories);

      if (categories && categories.length > 0) {
        var foundCategory = categories.find(x => x.id == selectedCategory);
        setCategoryName(foundCategory?.name);
      }
    }

  }, [selectedCategory, categories]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {categoryName} Kategorisi
      </Typography>

      {/* Kategori butonları */}
      <Box mb={4} display="flex" gap={2} flexWrap="wrap">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "contained" : "outlined"}
            onClick={() => navigate(`/category/${cat.id}`)}
          >
            {cat.name}
          </Button>
        ))}
      </Box>

      {/* Kitap kartları */}
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid size={3} key={book.id}>
            <Box
              border="1px solid #ccc"
              borderRadius="8px"
              p={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              height="100%"
              textAlign="center"
              sx={{ minHeight: 350 }}
            >
              <img
                src={
                  book.imageUrl ||
                  `https://dummyimage.com/150x200/ec5e6f/fff&text=${encodeURIComponent(book.title)}`
                }
                alt={book.title}
                style={{
                  width: "150px",
                  height: "200px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h6">{book.title}</Typography>
              <Typography color="error" fontWeight="bold">
                ₺{book.price}
              </Typography>

              <Box mt={2} display="flex" gap={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    addToCart(book);
                    setOpenSnackbar(true);
                  }}
                >
                  Sepete Ekle
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSelectedBook(book);
                    setDrawerOpen(true);
                  }}
                >
                  Detaylar
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Sepete eklendi bildirimi */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          icon={false}
          sx={{
            width: "100%",
            backgroundColor: "#ec5e6f",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Ürün sepete eklendi!
        </Alert>
      </Snackbar>

      {/* Drawer ile detay */}
      <BookDetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        book={selectedBook}
      />
    </Box>
  );
};

export default CategoryPage;
