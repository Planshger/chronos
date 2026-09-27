import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import theme from '../../../core/theme/darkTheme';
import { useCallback } from 'react';
import { useAuth } from '../../../providers/AuthProvider';

const LandingAppBar = () => {
    const {token, role} = useAuth();
    const navigate = useNavigate();

    const onClick = useCallback((url: string) => {
        if(!token) {
          navigate('/register')
        } else {
          navigate(url)
        }
      }, [navigate, token])

    return (
        <Box sx={{p: 4}}>
            <AppBar position="fixed" sx={{backdropFilter: 'blur(10px)'}}>
                <Toolbar>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1}}>Chronos</Typography>
                    <Button onClick={() => onClick(role === 'admin' ? '/admin' : '/schedule')} sx={{color: theme.palette.text.primary}}>Вход</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default LandingAppBar;
