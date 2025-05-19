import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  Paper,
  Button,
} from "@mui/material";
import { Add, Remove, Delete, ClearAll, ShoppingCartCheckout } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart, // ✅ sepeti temizleme için eklendi
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Satın alma işlemi başlatıldı!"); // Bu kısmı daha sonra API'ye bağlayabilirsin
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        🛒 Sepetim
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Sepetiniz şu anda boş. Yeni kitaplar keşfetmeye ne dersiniz? 📚
        </Typography>
      ) : (
        <>
          <Paper elevation={2}>
            <List>
              {cart.map((item) => (
                <Box key={item.id}>
                  <ListItem
                    secondaryAction={
                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => decreaseQuantity(item.id)}>
                          <Remove />
                        </IconButton>
                        <Typography px={1}>{item.quantity}</Typography>
                        <IconButton onClick={() => increaseQuantity(item.id)}>
                          <Add />
                        </IconButton>
                        <IconButton
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    }
                  >
                    <Avatar
                      variant="square"
                      src={`https://dummyimage.com/60x80/ec5e6f/fff&text=${encodeURIComponent(
                        item.title[0]
                      )}`}
                      sx={{ width: 60, height: 80, marginRight: 2 }}
                    />
                    <ListItemText
                      primary={item.title}
                      secondary={`₺${item.price.toFixed(2)} x ${item.quantity} = ₺${(
                        item.price * item.quantity
                      ).toFixed(2)}`}
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
            </List>
          </Paper>

          <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold" color="primary">
              Toplam Tutar: ₺{total.toFixed(2)}
            </Typography>

            <Box>
              <Button
                variant="outlined"
                color="error"
                startIcon={<ClearAll />}
                onClick={clearCart}
                sx={{ mr: 2 }}
              >
                Sepeti Temizle
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartCheckout />}
                onClick={handleCheckout}
              >
                Satın Al
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPage;
