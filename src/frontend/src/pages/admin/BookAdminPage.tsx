import { useEffect, useState } from "react";
import { fetchBooks, fetchBookByCategory, createBook ,deleteBook} from "../../services/book-service";
import { fetchCategories } from "../../services/category-service";
import { CategoryDto } from "../../models/category/CategoryDTO";
import { BookDto } from "../../models/book/BookDTO";
import BookFormModal from "../../components/Admin/BookFormModal";



import {
  Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, IconButton, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CreateBookDto } from "../../models/book/CreateBookDTO";

const BookListPage = () => {
  const [books, setBooks] = useState<BookDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);


  const loadBooks = () => {
    fetchBooks((data) => setBooks(data));
  };

  const loadCategories = async () => {
    try {
      await fetchCategories((data) => {
        setCategories(data);
      });
    } catch (error) {
      console.error("Kategori verisi alınamadı:", error);
    }
  };
  

  const handleCategoryChange = (event: any) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === 0) {
      loadBooks();
    } else {
      fetchBookByCategory(categoryId, (data) => setBooks(data));
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu kitabı silmek istiyor musunuz?")) {
      try {
        await deleteBook(id);
        loadBooks(); // listeyi yenile
      } catch (error) {
        console.error("Silme işlemi başarısız:", error);
      }
    }
  }

  const handleSaveBook = async (book: CreateBookDto) => {
    try {
      await createBook(book);
      loadBooks();
    } catch (err) {
      console.error("Kitap eklenemedi:", err);
    }
  };

  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Kitap Listesi</Typography>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
          + Yeni Kitap
        </Button>
        <FormControl size="small" style={{ width: 200 }}>
          <InputLabel>Kategori</InputLabel>
          <Select value={selectedCategory} label="Kategori" onChange={handleCategoryChange}>
            <MenuItem value={0}>Tümü</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Başlık</TableCell>
              <TableCell>Yazar</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Kategori</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.price.toLocaleString("tr-TR")} ₺</TableCell>
                <TableCell>{book.categoryName}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(book.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <BookFormModal open={openModal} onClose={() => setOpenModal(false)} onSave={handleSaveBook} categories={categories} />
    </Container>
  );
};

export default BookListPage;
