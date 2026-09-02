import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9333ea',
      light: '#a855f7',
      dark: '#7e22ce',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f9fafb',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#6b7280',
    },
  },
  custom: {
    gradients: {
      primary: 'linear-gradient(to right, #6366f1, #9333ea)',
      hero: 'linear-gradient(to right, #6366f1, #9333ea, #ec4899)',
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
    },
    accent: {
      pink: '#ec4899',
      green: '#22c55e',
      amber: '#f59e0b',
      blue: '#60a5fa',
    },
    border: {
      light: 'rgba(0, 0, 0, 0.08)',
      medium: 'rgba(0, 0, 0, 0.12)',
    },
    background: {
      muted: 'rgba(0, 0, 0, 0.02)',
      glass: 'rgba(255, 255, 255, 0.15)',
    },
    text: {
      muted: '#9ca3af',
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
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
          '&:focus': { outline: 'none', boxShadow: 'none' },
          '&:focus-visible': {
            outline: '2px solid #6366f1',
            outlineOffset: '2px',
          },
          '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
        },
        contained: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        },
        containedPrimary: {
          background: '#6366f1',
          color: '#ffffff',
          '&:hover': { background: '#4f46e5' },
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
          '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
            backgroundColor: '#f9fafb',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus': { outline: 'none', boxShadow: 'none' },
          '&:focus-visible': {
            outline: '2px solid #6366f1',
            outlineOffset: '2px',
          },
          '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          color: '#1a1a1a',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});
