import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ✅ Tip Tanımları
type OrderItem = {
  bookId: number;
  title: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  orderDate: string;
  totalPrice: number;
  shippingAddress: string;
  status: string;
  books: OrderItem[]; // 💡 Burada "items" değil "books"!
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Lütfen giriş yapın.');
          navigate('/login');
          return;
        }

        const response = await fetch('https://localhost:7202/api/order', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Siparişler alınamadı.');
        }

        const data: Order[] = await response.json();
        console.log('Sipariş verisi:', data);
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert('Sipariş bilgileri getirilirken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <CircularProgress />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Siparişlerim
      </Typography>

      {orders.length === 0 ? (
        <Typography>Henüz hiç sipariş vermemişsiniz.</Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order.id}
            elevation={3}
            style={{ padding: '1rem', marginBottom: '1rem' }}
          >
            <Typography variant="h6">Sipariş #{order.id}</Typography>
            <Typography variant="body2" color="textSecondary">
              Tarih: {new Date(order.orderDate).toLocaleString()}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Adres: {order.shippingAddress}
            </Typography>
            <Typography variant="subtitle1">Toplam: ₺{order.totalPrice}</Typography>

            <List dense>
              {order.books?.map((item) => (
                <ListItem key={item.bookId}>
                  <ListItemText
                    primary={`${item.title} (x${item.quantity})`}
                    secondary={`₺${item.price} x ${item.quantity} = ₺${(
                      item.price * item.quantity
                    ).toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default OrdersPage;
