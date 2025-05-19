import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Grid
} from "@mui/material";
import { useState } from "react";
import { CategoryDto } from "../../models/category/CategoryDTO";
import { CreateBookDto } from "../../models/book/CreateBookDTO";

import { format } from "date-fns";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale/tr';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (book: CreateBookDto) => void;
    categories: CategoryDto[];
}

const BookFormModal = ({ open, onClose, onSave, categories }: Props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [publishDate, setPublishDate] = useState<Date | null>(null);

    const handleSave = () => {
        if (!publishDate) {
            alert("Lütfen yayın tarihi seçin.");
            return;
        }

        const formattedDate = format(publishDate, "yyyy-MM-dd");

        const newBook: CreateBookDto = {
            title,
            author,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            categoryId,
            publishDate: formattedDate
        };

        onSave(newBook);
        handleClose();
    };

    const handleClose = () => {
        setTitle("");
        setAuthor("");
        setDescription("");
        setPrice("");
        setStock("");
        setCategoryId(0);
        setPublishDate(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"  disableEnforceFocus  container={document.getElementById("dialog-root")}>
            <DialogTitle>Yeni Kitap Ekle</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            label="Başlık"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                            
                            />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Yazar"
                            fullWidth
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Açıklama"
                            fullWidth
                            multiline
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Fiyat"
                            fullWidth
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            label="Stok"
                            fullWidth
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </Grid>
                    <Grid size={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
                            <DatePicker
                                label="Yayın Tarihi"
                                value={publishDate}
                                onChange={(newDate) => setPublishDate(newDate)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        error: !publishDate,
                                        helperText: !publishDate && "Lütfen yayın tarihi seçin"
                                    }
                                }}
                            />
        
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            select
                            label="Kategori"
                            fullWidth
                            value={categoryId}
                            onChange={(e) => setCategoryId(Number(e.target.value))}
                            error={categoryId === 0}
                            helperText={categoryId === 0 ? "Lütfen bir kategori seçin" : ""}
                        >
                            <MenuItem value={0} disabled>-- Kategori Seçin --</MenuItem>
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    İptal
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Ekle
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookFormModal;
