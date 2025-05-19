import { Grid, Typography, Box } from "@mui/material";
import { categories } from "../data/categories";
import { CategoryDto } from "../models/category/CategoryDTO";

interface CategoryGridProps {
  categories: CategoryDto[];
  onCategoryClick: (category: CategoryDto) => void;
}

const CategoryGrid = ({ categories, onCategoryClick }: CategoryGridProps) => {



  return (
    <Grid container spacing={3}>
      {categories.map((cat) => (
        <Grid size={3} key={cat.id}>
          <Box
            onClick={() => onCategoryClick(cat)}
            sx={{
              backgroundColor: cat.color || "#f5f5f5",
              padding: 3,
              borderRadius: "16px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: 2,
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 5,
              },
            }}
          >
            <img
              src={cat.icon}
              alt={cat.name}
              style={{
                width: 60,
                height: 60,
                marginBottom: 12,
                objectFit: "contain",
              }}
            />
            <Typography variant="subtitle1" fontWeight="medium">
              {cat.name}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryGrid;
