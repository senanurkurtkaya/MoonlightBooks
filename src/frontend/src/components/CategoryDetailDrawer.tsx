import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { CategoryDto } from "../models/category/CategoryDTO";

interface Props {
  open: boolean;
  onClose: () => void;
  category: CategoryDto | null;
}

const CategoryDetailDrawer = ({ open, onClose, category }: Props) => {
  if (!category) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 3, position: "relative" }}>
        {/* ❌ Kapatma butonu */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        {/* 🎨 Kategori bilgisi */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: category.color || "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3
          }}
        >
          <img
            src={category.icon}
            alt={category.name}
            style={{ width: 50, height: 50 }}
          />
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {category.name}
        </Typography>

        <Typography variant="body2" mb={3}>
          {category.description || "Bu kategori hakkında henüz açıklama eklenmedi."}
        </Typography>

        <Button
          fullWidth
          component={Link}
          to={`/category/${category.id}`}
          variant="contained"
        >
          Kitapları Gör
        </Button>
      </Box>
    </Drawer>
  );
};

export default CategoryDetailDrawer;
