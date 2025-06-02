import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Üst Menü */}
      <AppBar position="static" sx={{ backgroundColor: '#ec6c7c' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" gap={2}>
            {user ? (
              <>
                <Typography sx={{ color: 'white', alignSelf: 'center' }}>
                  Merhaba, {user?.fullName || user?.email}
                </Typography>
                {user.role === "Admin" && (
                  <Button color="inherit" onClick={() => navigate("/admin/dashboard")}>
                    Yönetim Paneli
                  </Button>
                )}
                <Button color="inherit" onClick={handleLogout}>Çıkış Yap</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>Giriş Yap</Button>
                <Button color="inherit" onClick={() => navigate('/register')}>Kayıt Ol</Button>
              </>
            )}
            <Button color="inherit" onClick={() => navigate('/checkout')}>Satın Al</Button>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <ShoppingCartIcon />
            <Typography variant="body1">
              Sepetim: {getCartCount()} ürün
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logo */}
      <Box textAlign="center" py={3}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1972/1972513.png"
          alt="Cupcake Logo"
          style={{ width: 60, height: 60 }}
        />
        <Typography variant="h4" fontWeight="bold">Sweets House</Typography>
        <Typography variant="subtitle1" color="text.secondary">KİTAP DÜKKANI</Typography>
      </Box>

      {/* Navigasyon + Arama */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        flexWrap="wrap"
        sx={{ paddingY: 2 }}
      >
        <Button color="inherit" onClick={() => navigate('/')}>Anasayfa</Button>
        <Button color="inherit" onClick={() => navigate('/books')}>Tüm Kitaplar</Button>
        <Button color="inherit" onClick={() => navigate('/category/1')}>Kategoriler</Button>
        <Button color="inherit" onClick={() => navigate('/cart')}>Sepetim</Button>
        {user && (
          <Button color="inherit" onClick={() => navigate('/orders')}>Siparişlerim</Button>
        )}

        <TextField
          variant="outlined"
          size="small"
          placeholder="Kitap ara..."
          sx={{ minWidth: 200 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>
    </>
  );
}
