import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { BookDto } from "../models/book/BookDTO";

interface Props {
    books: BookDto[];
    onAddToCart: () => void;
    onDetail: (book: BookDto) => void; 
  }

const BookGrid: React.FC<Props> = ({ books, onAddToCart,onDetail }) => {
  const { addToCart } = useCart();

  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid size={3}  key={book.id}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="200"
              image={
                book.imageUrl ||
                `https://dummyimage.com/150x200/ec5e6f/fff&text=${encodeURIComponent(book.title)}`
              }
              alt={book.title}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.author}
              </Typography>
              <Typography color="error">₺{book.price}</Typography>

              <Box display="flex" justifyContent="center" gap={1} mt={2}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    addToCart(book);
                    onAddToCart();
                  }}
                >
                  Sepete Ekle
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onDetail(book)}
                >
                  Detaylar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;
