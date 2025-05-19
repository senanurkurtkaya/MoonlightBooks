// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // işte bu açık tema için
    primary: {
      main: '#ec6c7c', // pembe tonu
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: `'Segoe UI', sans-serif`,
    button: {
      textTransform: 'none', // buton harflerini büyük yapmasın
    },
  },
});

export default theme;
