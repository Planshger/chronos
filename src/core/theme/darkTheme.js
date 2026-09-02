import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#0f172a',
    },
    secondary: {
      main: '#a855f7',
      light: '#c084fc',
      dark: '#9333ea',
      contrastText: '#0f172a',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  custom: {
    gradients: {
      primary: 'linear-gradient(to right, #818cf8, #a855f7)',
      hero: 'linear-gradient(to right, #818cf8, #a855f7, #f472b6)',
    },
    shadows: {
      sm: '0 1px 3px rgba(0, 0, 0, 0.5)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.6)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8)',
    },
    accent: {
      pink: '#f472b6',
      green: '#34d399',
      amber: '#fbbf24',
      blue: '#93c5fd',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.08)',
      medium: 'rgba(255, 255, 255, 0.12)',
    },
    background: {
      muted: 'rgba(255, 255, 255, 0.03)',
      glass: 'rgba(255, 255, 255, 0.08)',
    },
    text: {
      muted: '#64748b',
    },
  },
  typography: {
   fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.625,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
          '&:focus-visible': {
            outline: '2px solid #818cf8',
            outlineOffset: '2px',
          },
        },
        containedPrimary: {
          background: '#818cf8',
          color: '#0f172a',
          '&:hover': { background: '#6366f1' },
        },
        outlined: {
          borderColor: 'rgba(255,255,255,0.2)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.3)',
            backgroundColor: 'rgba(255,255,255,0.05)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(12px)',
          color: '#f1f5f9',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', 
        },
      },
    },
  },
});

export default theme;