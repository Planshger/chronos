import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import UserModel from '../../../../shared/models/user_model';
import { useLoading } from '../../SettingsModule';
import { useAuth } from '../../../auth/AuthProvider';
import { updateUserData } from '../../../admin/datasources/admin_data_source';
import { withLoading } from '../../../../shared/utils/withLoading';
import { useApiError } from '../../../../shared/errors/ApiErrorProvider';

export default function ProfileSettings() {
  const { setLoading } = useLoading();
  const { user, setUser } = useAuth();
  const { showError } = useApiError();
  const [editUser, setEditUser] = useState<UserModel>(
    user ?? ({ name: 'name', email: 'email' } as UserModel),
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      const { name, value } = e.target;
      setEditUser((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const onClick = useCallback(async () => {
    if (user?.email !== editUser.email || user?.name !== editUser.name) {
      try {
        await withLoading(
          () => updateUserData(editUser).then((updatedUser) => setUser(updatedUser)),
          setLoading,
        );
      } catch (error) {
        showError(error);
      }
    }
  }, [editUser, user, setLoading, setUser, showError]);

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
