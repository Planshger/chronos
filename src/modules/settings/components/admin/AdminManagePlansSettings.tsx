import { addPlan, getAllPlans, initialPlan, PlanCard, PlanModel, updatePlanData } from '../../../plans';
import AdminEditManagePlansSettings from './AdminEditManagePlansSettings';
import injectMobxStore from '../../../../shared/utils/injectMobxStore';
import { withLoading } from '../../../../shared/utils/withLoading';
import { useApiError } from '../../../../shared/errors/ApiError';
import { useCallback, useEffect, useState } from 'react';
import SettingsStore from '../../stores/SettingsStore';
import { Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { AdminPlansGrid, AdminPlansSettingsRoot } from './style/AdminManagePlansSettings.style';

interface AdminManagePlansSettingsProps {
  settingsStore: SettingsStore;
}

function AdminManagePlansSettings({ settingsStore }: AdminManagePlansSettingsProps) {
  const { showError } = useApiError();
  const [plans, setPlans] = useState<PlanModel[]>([]);
  const [changePlans, setChangePlans] = useState<{
    openEdit: boolean;
    openCreate: boolean;
    plan: PlanModel;
  }>({ openEdit: false, openCreate: false, plan: initialPlan });

  const loadData = useCallback(() => {
    withLoading(() => getAllPlans().then((res) => setPlans(res)), settingsStore.setLoading).catch(showError);
  }, [settingsStore, showError]);

  const loadAddPlan = useCallback(
    async (plan: PlanModel) => {
      await addPlan(plan);
      loadData();
    },
    [loadData],
  );

  const handleCreatePlan = useCallback(() => {
    setChangePlans({ plan: initialPlan, openEdit: false, openCreate: true });
  }, []);

  const handleEditPlan = useCallback((plan: PlanModel) => {
    setChangePlans({ plan, openEdit: true, openCreate: false });
  }, []);

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
    <AdminPlansSettingsRoot>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="text"
          size="small"
          sx={{ mb: 4, position: 'relative' }}
          startIcon={<Add />}
          onClick={handleCreatePlan}
        >
          Создать
        </Button>
      </Box>

      <AdminPlansGrid>
        {plans.map((p) => (
          <PlanCard
            key={p.name}
            plan={p}
            actionLabel="Редактировать"
            onAction={() => handleEditPlan(p)}
            highlightInactive
            outlinePopular
          />
        ))}
      </AdminPlansGrid>

      <AdminEditManagePlansSettings
        isCreate={changePlans.openCreate}
        addPlan={loadAddPlan}
        setPlans={setPlans}
        onClose={switchEditMenu}
        updatePlan={loadDataWithEditPlan}
        open={changePlans.openCreate ? changePlans.openCreate : changePlans.openEdit}
        plan={changePlans.plan}
      />
    </AdminPlansSettingsRoot>
  );
}

export default injectMobxStore('settingsStore', AdminManagePlansSettings);
