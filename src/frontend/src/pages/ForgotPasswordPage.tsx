import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔧 API entegrasyonu burada olacak
    alert(`Şifre sıfırlama bağlantısı ${email} adresine gönderildi.`);
    setEmail("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
      }}
    >
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={2} fontWeight="bold">
          Şifremi Unuttum
        </Typography>

        <Typography variant="body2" mb={3}>
          Lütfen hesabınıza bağlı e-posta adresinizi girin. Şifre sıfırlama
          bağlantısı gönderilecektir.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="E-posta"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "primary.main",
              ":hover": { backgroundColor: "#d85b72" },
            }}
          >
            Gönder
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;
