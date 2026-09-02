import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      gradients: {
        primary: string;
        hero: string;
      };
      shadows: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      accent: {
        pink: string;
        green: string;
        amber: string;
        blue: string,
      };
      border: {
        light: string;
        medium: string;
      };
      background: {
        muted: string;
        glass: string;
      };
      text: {
        muted: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: Partial<Theme['custom']>;
  }
}