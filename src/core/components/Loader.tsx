import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader(props: CircularProgressProps) {
    return (
         <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: (theme) => theme.zIndex.modal, borderRadius: '20px' }}>
            <CircularProgress variant="indeterminate" {...props} />
          </Box>
    );
}