import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import PlanModel, { initialPlan } from '../../../plans/models/plan_model';
import NumberField from '../../../../shared/ui/NumberField';
import Loader from '../../../../shared/ui/Loader';
import { useLoading } from '../../SettingsModule';
import { deletePlans, getAllPlans } from '../../../plans/datasources/plans_data_source';
import { withLoading } from '../../../../shared/utils/withLoading';
import { useApiError } from '../../../../shared/errors/ApiErrorProvider';

interface AdminEditManagePlansSettingsProps {
  updatePlan: (plan: PlanModel) => Promise<void>;
  setPlans: (plans: PlanModel[]) => void;
  addPlan: (plan: PlanModel) => Promise<void>;
  onClose: () => void;
  open: boolean;
  plan: PlanModel;
  isCreate?: boolean;
}

function monthsToDisplay(days: number, isTrial?: boolean): number {
  return isTrial ? days : Math.round(days / 30);
}

function daysToBackend(value: number, isTrial?: boolean): number {
  return isTrial ? value : Math.round(value * 30);
}

function textToFeatures(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function featuresToText(features: string[] | undefined | null): string {
  if (!features) return '';
  return features.join('\n');
}

function arraysEqual(a: string[] | undefined, b: string[] | undefined): boolean {
  const arrA = a ?? [];
  const arrB = b ?? [];
  if (arrA.length !== arrB.length) return false;
  return arrA.every((item, i) => item === arrB[i]);
}

function AdminEditManagePlansSettings({
  updatePlan,
  onClose,
  open,
  plan,
  setPlans,
  isCreate,
  addPlan,
}: AdminEditManagePlansSettingsProps) {
  const [editedPlan, setEditedPlan] = useState<PlanModel>(isCreate ? initialPlan : plan);
  const { setLoading, loading } = useLoading();
  const { showError } = useApiError();
  const theme = useTheme();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPlan((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const handleFeaturesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPlan((prev) => ({ ...prev, features: textToFeatures(e.target.value) }));
  }, []);

  const handleValueChange = useCallback(
    (name: keyof PlanModel, value: number | null) => {
      setEditedPlan((prev) => ({ ...prev, [name]: value ?? plan[name] }));
    },
    [plan],
  );

  const handleTrialChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPlan((prev) => ({
      ...prev,
      trial: e.target.checked,
      durationOfActivity: e.target.checked
        ? daysToBackend(prev.durationOfActivity, false)
        : monthsToDisplay(prev.durationOfActivity, false),
    }));
  }, []);

  const handlePopularChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPlan((prev) => ({ ...prev, popular: e.target.checked }));
  }, []);

  const handleActiveChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPlan((prev) => ({ ...prev, active: e.target.checked }));
  }, []);

  const handleDeletePlan = useCallback(
    async (id: number) => {
      try {
        await withLoading(() => deletePlans(id), setLoading);
        await withLoading(() => getAllPlans().then((res) => setPlans(res)), setLoading);
        onClose();
      } catch (error) {
        showError(error);
      }
    },
    [setLoading, setPlans, onClose, showError],
  );

  const handleSave = useCallback(async () => {
    const planToSend: PlanModel = {
      ...editedPlan,
      durationOfActivity: daysToBackend(editedPlan.durationOfActivity, editedPlan.trial),
      features: editedPlan.features ?? [],
    };

    const allKeys = new Set<keyof PlanModel>([
      ...(Object.keys(plan) as (keyof PlanModel)[]),
      ...(Object.keys(planToSend) as (keyof PlanModel)[]),
    ]);

    const isChanged = [...allKeys].some((key) => {
      if (key === 'features') return !arraysEqual(planToSend.features, plan.features);
      return planToSend[key] !== plan[key];
    });
    if (!isChanged) {
      onClose();
      return;
    }

    try {
      if (isCreate) {
        await addPlan(planToSend);
      } else {
        await updatePlan(planToSend);
      }
      onClose();
    } catch (error) {
      showError(error);
    }
  }, [plan, editedPlan, updatePlan, onClose, addPlan, isCreate, showError]);

  useEffect(() => {
    setEditedPlan({
      ...plan,
      durationOfActivity: monthsToDisplay(plan.durationOfActivity, plan.trial),
    });
  }, [plan]);

  return (
    <Modal
      open={open}
      onClose={(reason) => {
        if (reason !== 'backdropClick') return;
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(640px, calc(100vw - 32px))',
          maxHeight: 'calc(100dvh - 32px)',
          overflowY: 'auto',
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: 24,
          borderRadius: '20px',
          p: { xs: 3, sm: 5 },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => onClose()}
          sx={{ position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <Close />
        </IconButton>

        <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2 }}>
          {isCreate ? 'Создать тарифный план' : 'Редактировать тарифный план'}{' '}
          <Box component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
            {editedPlan.name}
          </Box>
        </Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField
            name="name"
            id="outlined-basic"
            label="Название"
            variant="standard"
            value={editedPlan.name}
            onChange={handleChange}
            sx={{ '& input::-webkit-contacts-auto-fill-button': { visibility: 'hidden' } }}
          />

          <TextField
            name="description"
            id="filled-textarea"
            label="Описание"
            variant="filled"
            multiline
            value={editedPlan.description}
            onChange={handleChange}
            sx={{ '& input::-webkit-contacts-auto-fill-button': { visibility: 'hidden' } }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <NumberField
              name="price"
              label="Прайс(RUB)"
              size="small"
              value={editedPlan.price}
              onValueChange={(value) => handleValueChange('price', value)}
            />

            <NumberField
              name="durationOfActivity"
              label={`Длительность(${editedPlan.trial ? 'дней' : 'месяц'})`}
              size="small"
              value={editedPlan.durationOfActivity}
              onValueChange={(value) => handleValueChange('durationOfActivity', value)}
            />
          </Stack>

          <TextField
            name="features"
            id="features-textarea"
            label="Возможности (по одной на строку)"
            variant="filled"
            multiline
            minRows={4}
            value={featuresToText(editedPlan.features)}
            onChange={handleFeaturesChange}
            sx={{ '& input::-webkit-contacts-auto-fill-button': { visibility: 'hidden' } }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ position: 'relative' }}>
            <Stack direction="row">
              <Typography variant="h6" sx={{ fontSize: '15px', pt: 0.8 }}>
                Пробный
              </Typography>

              <Switch
                checked={editedPlan.trial ?? false}
                onChange={handleTrialChange}
                color="secondary"
              />
            </Stack>

            <Stack direction="row">
              <Typography variant="h6" sx={{ fontSize: '15px', pt: 0.8 }}>
                Популярный
              </Typography>

              <Switch
                checked={editedPlan.popular ?? false}
                onChange={handlePopularChange}
                color="secondary"
              />
            </Stack>

            <Stack direction="row">
              <Typography variant="h6" sx={{ fontSize: '15px', pt: 0.8 }}>
                Активный
              </Typography>

              <Switch
                checked={editedPlan.active ?? false}
                onChange={handleActiveChange}
                color="secondary"
              />
            </Stack>

            {!isCreate && (
              <Button
                variant="text"
                color="error"
                onClick={() => handleDeletePlan(editedPlan.id ?? 0)}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'center' }, ml: { sm: 'auto' } }}
              >
                Удалить
              </Button>
            )}
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          spacing={2}
          sx={{ mt: 3, justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ color: theme.palette.text.primary }}
          >
            {isCreate ? 'Создать' : 'Сохранить'}
          </Button>

          <Button variant="outlined" color="secondary" onClick={onClose}>
            Отмена
          </Button>
        </Stack>

        {loading && <Loader size={80} />}
      </Box>
    </Modal>
  );
}

export default memo(AdminEditManagePlansSettings);
