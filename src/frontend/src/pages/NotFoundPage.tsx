import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      textAlign="center"
      mt={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* Emoji ve görsel */}
      <Typography variant="h1" fontSize={90}>
        📚🤔
      </Typography>

      <Typography variant="h2" color="error" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h5" mt={1} mb={2}>
        Aradığın kitap maalesef raflarda yok!
      </Typography>

      <img
        src="https://cdn-icons-png.flaticon.com/512/2908/2908780.png"
        alt="Kitap bulunamadı"
        width={150}
        height={150}
        style={{ marginBottom: "20px" }}
      />

      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Anasayfaya Dön
      </Button>
    </Box>
  );
};

export default NotFoundPage;
