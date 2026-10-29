import { Alert, Snackbar } from '@mui/material';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { AppError } from './AppError';

interface ApiErrorContextValue {
  showError: (error: unknown) => void;
}

const ApiErrorContext = createContext<ApiErrorContextValue>({ showError: () => {} });

function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.userMessage;
  }
  return 'Произошла непредвиденная ошибка. Попробуйте ещё раз.';
}

interface ApiErrorProviderProps {
  children: ReactNode;
}

export function ApiErrorProvider({ children }: ApiErrorProviderProps) {
  const [message, setMessage] = useState<string | null>(null);
  const showError = useCallback((error: unknown) => setMessage(getErrorMessage(error)), []);
  const contextValue = useMemo(() => ({ showError }), [showError]);

  return (
    <ApiErrorContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={message !== null}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setMessage(null)}
      >
        <Alert severity="error" variant="filled" onClose={() => setMessage(null)}>
          {message}
        </Alert>
      </Snackbar>
    </ApiErrorContext.Provider>
  );
}

export function useApiError() {
  return useContext(ApiErrorContext);
}
