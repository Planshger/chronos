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
import PrivateRoute from './app/routes/PrivateRoute';
import ProfileSettings from './pages/settings/ProfileSettings';
import ManagePlansSettings from './pages/settings/ManagePlansSettings';
import AnalyticsSettings from './pages/settings/AnalyticsSettings';
import TelegramSettings from './pages/settings/TelegramSettings';
import MapSettings from './pages/settings/MapSettings';
import NotFoundPage from './pages/notFound/NotFoundPage';
import ErrorBoundary from './shared/errors/ErrorBoundary';
import { Role } from './shared/models/user_model';
import { SettingId } from './modules/settings/models/settings_model';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/plans" element={<PlansPage />} />

            <Route element={<PrivateRoute roles={[Role.User]} />}>
              <Route path="/schedule" element={<Schedule />} />
            </Route>

            <Route element={<PrivateRoute roles={[Role.Admin]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route element={<PrivateRoute roles={[Role.User, Role.Admin]} />}>
              <Route path="/settings" element={<Settings />}>
                <Route index element={<Navigate to={SettingId.Profile} replace />} />

                <Route path={SettingId.Profile} element={<ProfileSettings />} />
                <Route path={SettingId.ManagePlans} element={<ManagePlansSettings />} />
                <Route path={SettingId.Analytics} element={<AnalyticsSettings />} />
                <Route path={SettingId.Telegram} element={<TelegramSettings />} />
                <Route path={SettingId.Map} element={<MapSettings />} />

                <Route element={<PrivateRoute roles={[Role.Admin]} />}>
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
