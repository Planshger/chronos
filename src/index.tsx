import ReactDOM from 'react-dom/client';
import { StrictMode, useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import App from './App';
import { ApiErrorProvider, useApiError } from './shared/errors/ApiErrorProvider';
import { AppStores, createStores, initializeStores } from './app/stores/AppStores';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/queryClient';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function AppWithStores() {
  const { showError } = useApiError();
  const [stores] = useState<AppStores>(() => createStores(showError));

  useEffect(() => initializeStores(stores), [stores]);

  return (
    <Provider {...stores}>
      <App />
    </Provider>
  );
}

root.render(
  <QueryClientProvider client={queryClient}>
    <ApiErrorProvider>
      <AppWithStores />
    </ApiErrorProvider>
  </QueryClientProvider>,
);
