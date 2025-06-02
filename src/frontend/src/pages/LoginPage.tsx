// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      setError("Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 350 }}>
        <Typography variant="h5" align="center" mb={3} fontWeight="bold">
          Giriş Yap
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            label="E-posta"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            disabled={loading}
            error={!!error}
          />

          <TextField
            label="Şifre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            disabled={loading}
            error={!!error}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "primary.main",
              color: "#fff",
              fontWeight: "bold",
              height: 48,
              ":hover": {
                backgroundColor: "#d85b72",
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Giriş Yap"}
          </Button>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Hesabınız yok mu?{" "}
              <Link
                to="/register"
                style={{ color: "#ec6c7c", textDecoration: "none" }}
              >
                Kayıt Ol
              </Link>
            </Typography>
            <Typography variant="body2" mt={1}>
              <Link
                to="/forgot-password"
                style={{ color: "#ec6c7c", textDecoration: "none" }}
              >
                Şifremi unuttum
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
