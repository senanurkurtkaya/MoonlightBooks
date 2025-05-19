import React from "react";
import { Typography } from "@mui/material";
import BookGrid from "./BookGrid";
import { BookDto } from "../models/book/BookDTO";


interface Props {
  books: BookDto[];
  onAddToCart: () => void;
  onDetail: (book: BookDto) => void;
}

const FeaturedBooks: React.FC<Props> = ({ books, onAddToCart, onDetail }) => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Öne Çıkan Kitaplar
      </Typography>
      <BookGrid books={books} onAddToCart={onAddToCart} onDetail={onDetail} />
    </>
  );
};

export default FeaturedBooks;