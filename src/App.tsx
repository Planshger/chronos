import { ThemeProvider } from '@mui/material/styles';
import LandingPage from './features/landing/LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './features/registrarion/RegistrationPage';
import CssBaseline from '@mui/material/CssBaseline';
import PlansPage from './features/plans/PlansPage';
import Schedule from './features/schedule/Schedule';
import Settings from './features/settings/Settings';
import theme from './core/theme/darkTheme';

function App() {
  return (
     <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="/plans" element={<PlansPage/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/settings/*" element={<Settings/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
