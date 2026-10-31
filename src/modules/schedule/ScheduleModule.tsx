import { useState } from 'react';
import { Box, Container, Dialog, Stack, useMediaQuery, useTheme } from '@mui/material';
import Calendary from './components/Calendary';
import ScheduleAppBar from './components/ScheduleAppBar';
import Scheduling from './components/Scheduling';
import AiDialog from './components/AiDialog';
import OptionsDialog from './components/OptionsDialog';
import Loader from '../../shared/ui/Loader';
import ScheduleStore from './stores/ScheduleStore';
import injectMobxStore from '../../shared/utils/injectMobxStore';

interface ScheduleProps {
  scheduleStore: ScheduleStore;
}

function Schedule({ scheduleStore }: ScheduleProps) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.paper }}>
      <ScheduleAppBar isAiOpen={isAiOpen} setIsAiOpen={setIsAiOpen} />

      <Container maxWidth={false} sx={{ py: { xs: 2, md: 3 }, px: { xs: 1.5, sm: 3 } }}>
        <Stack
          spacing={{ xs: 2, md: 3 }}
          direction={{ xs: 'column', md: 'row' }}
          sx={{ alignItems: 'stretch', minWidth: 0 }}
        >
          <Calendary />
          {!isMobile && <Scheduling />}
        </Stack>
      </Container>

      {isMobile && (
        <Dialog
          open={scheduleStore.isSchedulingOpen}
          onClose={scheduleStore.closeScheduling}
          fullWidth
          maxWidth="sm"
          slotProps={{
            paper: {
              sx: {
                width: 'calc(100% - 32px)',
                maxHeight: 'calc(100dvh - 32px)',
                borderRadius: 4,
              },
            },
          }}
        >
          <Scheduling />
        </Dialog>
      )}

      {isAiOpen && <AiDialog setIsAiOpen={setIsAiOpen} />}
      <OptionsDialog />

      {scheduleStore.loading && <Loader size={80} />}
    </Box>
  );
}

export default injectMobxStore('scheduleStore', Schedule);
