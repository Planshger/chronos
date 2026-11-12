import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import UserModel, { initialUser } from '../../../../shared/models/user_model';
import { AuthStore } from '../../../auth';
import { SettingsStore } from '../../stores/SettingsStore';
import { updateUserData } from '../../../../shared/api/userApi';
import { withLoading } from '../../../../shared/utils/withLoading';
import { useApiError } from '../../../../shared/errors/ApiError';
import injectMobxStore from '../../../../shared/utils/injectMobxStore';

interface ProfileSettingsProps {
  authStore: AuthStore;
  settingsStore: SettingsStore;
}

function ProfileSettings({ authStore, settingsStore }: ProfileSettingsProps) {
  const user = authStore.user;
  const { showError } = useApiError();
  const [editUser, setEditUser] = useState<UserModel>(user ?? initialUser);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      const { name, value } = e.target;
      setEditUser((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const onClick = useCallback(() => {
    if (user?.email !== editUser.email || user?.name !== editUser.name) {
      try {
        withLoading(
          () => updateUserData(editUser).then((updatedUser) => authStore.setUser(updatedUser)),
          settingsStore.setLoading,
        );
      } catch (error) {
        showError(error);
      }
    }
  }, [editUser, user, settingsStore, showError, authStore]);

  return (
    <Stack
      spacing={6}
      sx={{ width: { xs: '100%', sm: '80%', md: '60%' }, mx: 'auto', mt: { xs: 4, sm: 6, md: 8 } }}
    >
      <TextField
        name="name"
        value={editUser.name}
        label="Имя"
        onChange={(e) => onChange(e)}
        fullWidth
        size="medium"
        sx={{ '& fieldset': { borderColor: 'background.paper' } }}
      />

      <TextField
        name="email"
        value={editUser.email}
        label="Эл. почта"
        onChange={(e) => onChange(e)}
        fullWidth
        size="medium"
        sx={{ '& fieldset': { borderColor: 'background.paper' } }}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={onClick}
        sx={{ borderRadius: 3, color: 'text.primary' }}
      >
        Сохранить изменения
      </Button>
    </Stack>
  );
}

export default injectMobxStore(['authStore', 'settingsStore'], ProfileSettings);
