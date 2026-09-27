import { ThemeProvider } from '@mui/material/styles';
import LandingPage from './features/landing/LandingPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RegistrationPage from './features/registrarion/RegistrationPage';
import CssBaseline from '@mui/material/CssBaseline';
import PlansPage from './features/plans/PlansPage';
import Schedule from './features/schedule/Schedule';
import Settings from './features/settings/Settings';
import theme from './core/theme/darkTheme';
import Admin from './features/admin/Admin';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import ProfileSettings from './features/settings/components/ProfileSettings';
import ManagePlansSettings from './features/settings/components/ManagePlansSettings';
import AnalyticsSettings from './features/settings/components/AnalyticsSettings';
import TelegramSettings from './features/settings/components/TelegramSettings';
import WhatsAppSettings from './features/settings/components/WhatsAppSettings';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                <Route index element={<Navigate to={'profile_settings'} replace/>} />
                
                <Route path="profile_settings" element={<ProfileSettings />} />
                <Route path="manage_plans" element={<ManagePlansSettings />} />
                <Route path="analytics" element={<AnalyticsSettings />} />
                <Route path="telegram" element={<TelegramSettings />} />
                <Route path="whatsapp" element={<WhatsAppSettings />} />

                <Route element={<PrivateRoute roles={['admin']} />}>
                  <Route path="admin_profile_settings" element={<ProfileSettings />} />
                  <Route path="admin_manage_plans" element={<ManagePlansSettings />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
