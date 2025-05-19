// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 🔑 yönlendirme için

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7202/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Giriş başarısız");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // ✅ Token kaydedildi

      // 🎯 Role bilgisini JWT'den oku
      const base64Payload = data.token.split('.')[1];
      const decodedPayload = JSON.parse(atob(base64Payload));
      const role = decodedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      alert("Giriş başarılı!");

      // ✅ Role'a göre yönlendir
      if (role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Giriş hatası:", error);
      alert("Giriş yapılırken bir hata oluştu.");
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
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" align="center" mb={3} fontWeight="bold">
          Giriş Yap
        </Typography>

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
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "primary.main",
              color: "#fff",
              fontWeight: "bold",
              ":hover": {
                backgroundColor: "#d85b72", // hover'da koyu pembe tonu
              },
            }}
          >
            Giriş Yap
          </Button>
          <Typography variant="body2" align="right" mt={1}>
            <Link
              to="/forgot-password"
              style={{ color: "#ec6c7c", textDecoration: "none" }}
            >
              Şifremi unuttum?
            </Link>
          </Typography>

        </form>
      </Paper>
    </Box>


  );
};

export default LoginPage;
