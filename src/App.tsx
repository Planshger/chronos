import { ThemeProvider } from '@mui/material/styles';
import LandingPage from './pages/landing/LandingPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/registration/RegistrationPage';
import CssBaseline from '@mui/material/CssBaseline';
import PlansPage from './pages/plans/PlansPage';
import Schedule from './pages/schedule/Schedule';
import Settings from './pages/settings/Settings';
import theme from './shared/ui/theme/darkTheme';
import Admin from './pages/admin/Admin';
import AuthProvider from './modules/auth/AuthProvider';
import PrivateRoute from './app/routes/PrivateRoute';
import ProfileSettings from './pages/settings/ProfileSettings';
import ManagePlansSettings from './pages/settings/ManagePlansSettings';
import AnalyticsSettings from './pages/settings/AnalyticsSettings';
import TelegramSettings from './pages/settings/TelegramSettings';
import MapSettings from './pages/settings/MapSettings';
import { ApiErrorProvider } from './shared/errors/ApiErrorProvider';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApiErrorProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/plans" element={<PlansPage />} />

              <Route element={<PrivateRoute roles={['user']} />}>
                <Route path="/schedule" element={<Schedule />} />
              </Route>

              <Route element={<PrivateRoute roles={['admin']} />}>
                <Route path="/admin" element={<Admin />} />
              </Route>

              <Route element={<PrivateRoute roles={['user', 'admin']} />}>
                <Route path="/settings" element={<Settings />}>
                  <Route index element={<Navigate to={'profile_settings'} replace />} />

                  <Route path="profile_settings" element={<ProfileSettings />} />
                  <Route path="manage_plans" element={<ManagePlansSettings />} />
                  <Route path="analytics" element={<AnalyticsSettings />} />
                  <Route path="telegram" element={<TelegramSettings />} />
                  <Route path="map_settings" element={<MapSettings />} />

                  <Route element={<PrivateRoute roles={['admin']} />}>
                    <Route path="admin_profile_settings" element={<ProfileSettings />} />
                    <Route path="admin_manage_plans" element={<ManagePlansSettings />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ApiErrorProvider>
    </ThemeProvider>
  );
}

export default App;
