import { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookDetailDrawer = ({ open, onClose, book }: Props) => {
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (book) {
      setLoading(false); // Eğer detay API çağrısı yapılmayacaksa bu yeterli
    }
  }, [book]);

  if (!book) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        {loading ? (
          <Box textAlign="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Kitap Görseli */}
            <Box
              component="img"
              src={
                book.imageUrl ||
                `https://dummyimage.com/300x400/ec5e6f/fff&text=${encodeURIComponent(book.title)}`
              }
              alt={book.title}
              sx={{ width: "100%", borderRadius: 2, mb: 2 }}
            />

            {/* Kitap Bilgileri */}
            <Typography variant="h5" fontWeight="bold">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={1}>
              {book.author}
            </Typography>
            <Typography color="error" fontWeight="bold" mb={2}>
              ₺{book.price}
            </Typography>

            <Typography variant="body2" mb={3}>
              {book.description || "Bu kitap hakkında henüz açıklama eklenmedi."}
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                addToCart(book);
                setSnackbarOpen(true);
              }}
            >
              Sepete Ekle
            </Button>

            {/* Yorumlar */}
            <Box mt={5}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography fontWeight="bold" mb={2}>
                  📣 Okuyucu Yorumları
                </Typography>

                <Typography fontWeight="bold">Ayşe:</Typography>
                <Typography mb={1}>Harika bir kitap, dili çok akıcıydı!</Typography>

                <Typography fontWeight="bold">Emre:</Typography>
                <Typography>Beklediğimden daha derindi. Tavsiye ederim.</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography fontWeight="medium" mb={1}>
                  Yorum Ekle:
                </Typography>
                <textarea
                  rows={4}
                  placeholder="Düşüncelerini paylaş..."
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    resize: "none",
                    fontFamily: "inherit",
                    marginBottom: 10,
                  }}
                />
                <Button variant="outlined" fullWidth>
                  Gönder
                </Button>
              </Paper>
            </Box>
          </>
        )}

        {/* Bildirim */}
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
      </Box>
    </Drawer>
  );
};

export default BookDetailDrawer;
