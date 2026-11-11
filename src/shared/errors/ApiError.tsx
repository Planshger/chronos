import { Alert, Snackbar } from '@mui/material';
import { MobXProviderContext } from 'mobx-react';
import { useContext } from 'react';
import ApiErrorStore from './ApiErrorStore';
import injectMobxStore from '../utils/injectMobxStore';

export function useApiError() {
  const { apiErrorStore } = useContext(MobXProviderContext);
  return { showError: apiErrorStore.showError };
}

interface ApiErrorSnackbarProps {
  apiErrorStore: ApiErrorStore;
}

function ApiErrorSnackbar({ apiErrorStore }: ApiErrorSnackbarProps) {
  const clearError = () => apiErrorStore.clearError();

  return (
    <Snackbar
      open={apiErrorStore.message !== null}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={clearError}
    >
      <Alert severity="error" variant="filled" onClose={clearError}>
        {apiErrorStore.message}
      </Alert>
    </Snackbar>
  );
}

export default injectMobxStore('apiErrorStore', ApiErrorSnackbar);
