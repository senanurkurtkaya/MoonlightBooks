import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  CircularProgress
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        alert("Lütfen önce giriş yapın.");
        navigate("/login");
        return;
      }

      if (!address.trim()) {
        alert("Lütfen teslimat adresini girin.");
        return;
      }

      const orderPayload = {
        shippingAddress: address,
        totalPrice: total,
        items: cart.map(item => ({
          bookId: item.id,
          quantity: item.quantity
        }))
      };

      const response = await fetch('https://localhost:7202/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Sunucu hatası');
      }

      alert('Sipariş başarıyla oluşturuldu!');
      clearCart(); // Sepeti temizle
      navigate('/orders'); // Sipariş sayfasına yönlendir
    } catch (error) {
      console.error(error);
      alert('Sipariş gönderilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Siparişi Tamamla</Typography>

      {cart.length === 0 ? (
        <Typography>Sepetiniz boş. Lütfen önce ürün ekleyin.</Typography>
      ) : (
        <>
          <List>
            {cart.map(item => (
              <Box key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={`${item.title} (x${item.quantity})`}
                    secondary={`₺${item.price} x ${item.quantity} = ₺${(item.price * item.quantity).toFixed(2)}`}
                  />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>

          <Box mt={3}>
            <Typography variant="h6">Toplam Tutar: ₺{total.toFixed(2)}</Typography>
          </Box>

          <Box mt={3}>
            <TextField
              label="Teslimat Adresi"
              fullWidth
              multiline
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleCheckout}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Sipariş Gönderiliyor...' : 'Siparişi Onayla'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CheckoutPage;
