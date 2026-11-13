import { Add } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import {
  addPlan,
  getAllPlans,
  initialPlan,
  PlanCard,
  PlanModel,
  updatePlanData,
} from '../../../plans';
import AdminEditManagePlansSettings from './AdminEditManagePlansSettings';
import { withLoading } from '../../../../shared/utils/withLoading';
import { useApiError } from '../../../../shared/errors/ApiError';
import injectMobxStore from '../../../../shared/utils/injectMobxStore';
import SettingsStore from '../../stores/SettingsStore';

interface AdminManagePlansSettingsProps {
  settingsStore: SettingsStore;
}

function AdminManagePlansSettings({ settingsStore }: AdminManagePlansSettingsProps) {
  const theme = useTheme();
  const { showError } = useApiError();
  const [plans, setPlans] = useState<PlanModel[]>([]);
  const [changePlans, setChangePlans] = useState<{
    openEdit: boolean;
    openCreate: boolean;
    plan: PlanModel;
  }>({ openEdit: false, openCreate: false, plan: initialPlan });

  const loadData = useCallback(() => {
    withLoading(() => getAllPlans().then((res) => setPlans(res)), settingsStore.setLoading).catch(
      showError,
    );
  }, [settingsStore, showError]);

  const loadAddPlan = useCallback(
    async (plan: PlanModel) => {
      await addPlan(plan);
      loadData();
    },
    [loadData],
  );

  const switchEditMenu = useCallback(
    (plan?: PlanModel) => {
      setChangePlans((prev) => {
        if (changePlans.openCreate) {
          return { ...prev, openCreate: !prev.openCreate, plan: plan ?? prev.plan };
        }

        return { ...prev, openEdit: !prev.openEdit, plan: plan ?? prev.plan };
      });
    },
    [changePlans.openCreate],
  );

  const loadDataWithEditPlan = useCallback(
    async (plan: PlanModel) => {
      await updatePlanData(plan);
      loadData();
    },
    [loadData],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        pb: 2,
        '&::-webkit-scrollbar': { width: 8 },
        '&::-webkit-scrollbar-thumb': { bgcolor: theme.custom.border.light, borderRadius: 4 },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="text"
          size="small"
          sx={{ mb: 4, position: 'relative' }}
          startIcon={<Add />}
          onClick={() => setChangePlans({ plan: initialPlan, openEdit: false, openCreate: true })}
        >
          Создать
        </Button>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 4,
          justifyContent: 'center',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
          },
          width: '100%',
        }}
      >
        {plans.map((p) => (
          <PlanCard
            key={p.name}
            plan={p}
            actionLabel="Редактировать"
            onAction={() => setChangePlans({ plan: p, openEdit: true, openCreate: false })}
            highlightInactive
            outlinePopular
          />
        ))}
      </Box>

      <AdminEditManagePlansSettings
        isCreate={changePlans.openCreate}
        addPlan={loadAddPlan}
        setPlans={setPlans}
        onClose={switchEditMenu}
        updatePlan={loadDataWithEditPlan}
        open={changePlans.openCreate ? changePlans.openCreate : changePlans.openEdit}
        plan={changePlans.plan}
      />
    </Box>
  );
}

export default injectMobxStore('settingsStore', AdminManagePlansSettings);
