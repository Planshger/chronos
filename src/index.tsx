import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import App from './App';
import ApiErrorSnackbar from './shared/errors/ApiError';
import { AppStores, createStores, initializeStores } from './app/stores/AppStores';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './shared/queryClient';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

function AppWithStores() {
  const [stores] = useState<AppStores>(() => createStores());

  useEffect(() => initializeStores(stores), [stores]);

  return (
    <Provider {...stores}>
      <ApiErrorSnackbar />
      <App />
    </Provider>
  );
}

root.render(
  <QueryClientProvider client={queryClient}>
    <AppWithStores />
  </QueryClientProvider>,
);
