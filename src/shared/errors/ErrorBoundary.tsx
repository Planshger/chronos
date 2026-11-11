import { Button, Stack, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error in application UI', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Stack
          spacing={2}
          sx={{ minHeight: '100vh', p: 3, alignItems: 'center', justifyContent: 'center' }}
        >
          <Typography variant="h2" component="h1">
            Что-то пошло не так
          </Typography>
          <Typography color="text.secondary">
            Произошла непредвиденная ошибка. Перезагрузите страницу и попробуйте ещё раз.
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </Button>
        </Stack>
      );
    }

    return this.props.children;
  }
}
