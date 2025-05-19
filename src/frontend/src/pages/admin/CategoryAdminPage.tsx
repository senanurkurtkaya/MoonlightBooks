import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Stack, Paper } from "@mui/material";


interface Category {
    id: number;
    name: string;
    icon: string;
    imageUrl?: string;
}


const CategoryAdminPage = () => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [imageUrl, setImageUrl] = useState("");



    // ✅ Mevcut kategorileri çek
    useEffect(() => {
        fetch("https://localhost:7202/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await fetch("https://localhost:7202/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name,
                    icon,
                    imageUrl,
                }),
            });

            if (!response.ok) throw new Error("Kategori eklenemedi");

            const added = await response.json();
            setCategories([...categories, added]); // anlık ekle
            setName("");
            setIcon("");
        } catch (err) {
            console.error(err);
            alert("Kategori eklenirken bir hata oluştu.");
        }
    };

    return (
        <Box p={4}>
            <Typography variant="h5" mb={3}>
                Kategori Ekle
            </Typography>

            <Stack spacing={2} maxWidth={400}>
                <TextField
                    label="Kategori Adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Icon (ör: ❤️)"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                />
                <TextField
                    label="Görsel URL"
                    fullWidth
                    margin="normal"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                <Button variant="contained" onClick={handleSubmit}>
                    Ekle
                </Button>
            </Stack>

            <Typography variant="h6" mt={4}>
                Mevcut Kategoriler
            </Typography>
            <Stack spacing={1} mt={2}>
                {categories.map((category) => (
                    <Paper key={category.id} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                        <img
                            src={category.imageUrl}
                            alt={category.name}
                            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "4px" }}
                        />
                        <Typography>{category.name}</Typography>
                    </Paper>
                ))}

            </Stack>
        </Box>
    );
};

export default CategoryAdminPage;
