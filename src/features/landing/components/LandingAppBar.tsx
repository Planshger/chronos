import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import theme from '../../../core/theme/darkTheme';

const LandingAppBar = () => {
    const navigate = useNavigate();

    function onClick() { navigate('/register'); }

    return (
        <Box sx={{p: 4}}>
            <AppBar position="fixed" sx={{backdropFilter: 'blur(10px)'}}>
                <Toolbar>
                    <Typography variant="h3" component="div" sx={{flexGrow: 1}}>Chronos</Typography>
                    <Button onClick={onClick} sx={{color: theme.palette.text.primary}}>Вход</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default LandingAppBar;
