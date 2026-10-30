import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Modal,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { memo, useCallback } from 'react';

import React from 'react';
import DropdownList from '../DropdownList';
import UserModel from '../../../../shared/models/user_model';

interface AdminTableEditMenuProps {
  onClick: (user: UserModel) => void;
  onClose: () => void;
  open: boolean;
  user: UserModel;
}

function AdminTableEditMenu({ onClick, onClose, open, user }: AdminTableEditMenuProps) {
  const [editedUser, setEditedUser] = React.useState<UserModel>(user);
  const theme = useTheme();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => {
      return { ...prev, [name]: value };
    });
  }, []);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>, id: string) => {
    setEditedUser((prev) => {
      return {
        ...prev,
        [id as keyof UserModel]: event.target.value === 'Нет' ? '' : event.target.value,
      };
    });
  }, []);

  const handleSave = useCallback(() => {
    const isChanged = (Object.keys(user) as (keyof UserModel)[]).some(
      (key) => editedUser[key] !== user[key],
    );

    if (isChanged) {
      onClick(editedUser);
    }
    onClose();
  }, [user, editedUser, onClick, onClose]);

  React.useEffect(() => {
    setEditedUser(user);
  }, [user]);

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
          width: 'min(400px, calc(100vw - 32px))',
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
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <Close />
        </IconButton>

        <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2 }}>
          Редактировать пользователя
        </Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField
            name="name"
            id="outlined-basic"
            label="Пользователь"
            variant="standard"
            value={editedUser.name}
            onChange={handleChange}
            sx={{ '& input::-webkit-contacts-auto-fill-button': { visibility: 'hidden' } }}
          />

          <TextField
            name="email"
            id="filled-basic"
            label="Email"
            variant="standard"
            value={editedUser.email}
            onChange={handleChange}
            sx={{ '& input::-webkit-contacts-auto-fill-button': { visibility: 'hidden' } }}
          />

          <DropdownList
            id="plan"
            label="Тариф"
            menuItems={['Базовый', 'Премиум', 'Пробный', 'Нет']}
            value={editedUser.plan}
            variant="standard"
            onChange={(event) => handleSelectChange(event, 'plan')}
          />

          <DropdownList
            id="status"
            label="Статус"
            menuItems={['Активен', 'Заблокирован', 'Ожидание оплаты']}
            value={editedUser.status}
            variant="standard"
            onChange={(event) => handleSelectChange(event, 'status')}
          />
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
            Сохранить
          </Button>

          <Button variant="outlined" color="secondary" onClick={onClose}>
            Отмена
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default memo(AdminTableEditMenu);
