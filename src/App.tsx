import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ManagePlansSettings from './pages/settings/ManagePlansSettings';
import RegistrationPage from './pages/registration/RegistrationPage';
import { SettingId } from './modules/settings/models/settings_model';
import AnalyticsSettings from './pages/settings/AnalyticsSettings';
import AuthSessionHandler from './app/routes/AuthSessionHandler';
import TelegramSettings from './pages/settings/TelegramSettings';
import ProfileSettings from './pages/settings/ProfileSettings';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import { ErrorBoundary, Role, theme, renderRouteFallback } from './shared';
import NotFoundPage from './pages/notFound/NotFoundPage';
import MapSettings from './pages/settings/MapSettings';
import LandingPage from './pages/landing/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import PrivateRoute from './app/routes/PrivateRoute';
import CssBaseline from '@mui/material/CssBaseline';
import Schedule from './pages/schedule/Schedule';
import Settings from './pages/settings/Settings';
import PlansPage from './pages/plans/PlansPage';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthSessionHandler />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route
              element={
                <PrivateRoute
                  fallback={(authStore, location) => renderRouteFallback(authStore, [Role.User], location)}
                />
              }
            >
              <Route path="/schedule" element={<Schedule />} />
            </Route>

            <Route
              element={
                <PrivateRoute
                  fallback={(authStore, location) => renderRouteFallback(authStore, [Role.Admin], location)}
                />
              }
            >
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route
              element={
                <PrivateRoute
                  fallback={(authStore, location) => renderRouteFallback(authStore, [Role.User, Role.Admin], location)}
                />
              }
            >
              <Route path="/settings" element={<Settings />}>
                <Route index element={<Navigate to={SettingId.Profile} replace />} />

                <Route path={SettingId.Profile} element={<ProfileSettings />} />
                <Route path={SettingId.ManagePlans} element={<ManagePlansSettings />} />
                <Route path={SettingId.Analytics} element={<AnalyticsSettings />} />
                <Route path={SettingId.Telegram} element={<TelegramSettings />} />
                <Route path={SettingId.Map} element={<MapSettings />} />

                <Route
                  element={
                    <PrivateRoute
                      fallback={(authStore, location) => renderRouteFallback(authStore, [Role.Admin], location)}
                    />
                  }
                >
                  <Route path={SettingId.AdminProfile} element={<ProfileSettings />} />
                  <Route path={SettingId.AdminManagePlans} element={<ManagePlansSettings />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
