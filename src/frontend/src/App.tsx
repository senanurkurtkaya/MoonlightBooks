import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


// Public Pages

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BookPage from "./pages/BookPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import CategoryPage from "./pages/CategoryPage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin Pages
import DashboardPage from "./pages/admin/DashboardPage";
import BookAdminPage from "./pages/admin/BookAdminPage";
import CategoryAdminPage from "./pages/admin/CategoryAdminPage";


function App() {
  return (
    <Routes>

      {/* Main Layout Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="books" element={<BookPage />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
 
      </Route>

      {/* Admin Layout Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="books" element={<BookAdminPage />} />
        <Route path="categories" element={<CategoryAdminPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        

      </Route>

    </Routes>
  );
}

export default App;
