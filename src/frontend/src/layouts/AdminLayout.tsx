import { Box, Button, Typography, Stack } from "@mui/material";
import { Outlet, Link, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";


const AdminLayout = () => {
  const user = getCurrentUser();

  // 🔒 Admin değilse giriş sayfasına yönlendir
  if (!user || user.role !== "Admin" || (user.exp && Date.now() >= user.exp * 1000)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
  
  
  return (
    <Box>
      <Box bgcolor="#333" color="white" px={4} py={2}>
        <Typography variant="h5">Admin Paneli</Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button component={Link} to="/admin/dashboard" variant="contained">Dashboard</Button>
          <Button component={Link} to="/admin/books" variant="contained">Kitaplar</Button>
          <Button component={Link} to="/admin/categories" variant="contained">Kategoriler</Button>

           <Box sx={{ flexGrow: 1 }} />

          <Button component={Link} to="/login" variant="contained">çıkış yap</Button>
        </Stack>
      </Box>

      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
