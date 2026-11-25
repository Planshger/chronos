import { Button, Modal, SelectChangeEvent, Stack, TextField, Typography, useTheme } from '@mui/material';
import { ADMIN_PLAN_OPTIONS, NO_PLAN_LABEL } from '../../../constants/adminTableOptions';
import UserModel, { UserStatus } from '../../../../../shared/models/user_model';
import { CloseButton, ModalContent } from './AdminTableMenu.style';
import { Close } from '@mui/icons-material';
import DropdownList from '../../DropdownList';
import { memo, useCallback } from 'react';
import React from 'react';

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
        [id as keyof UserModel]: event.target.value === NO_PLAN_LABEL ? NO_PLAN_LABEL : event.target.value,
        status: event.target.value === NO_PLAN_LABEL ? UserStatus.PendingPayment : prev.status,
      };
    });
  }, []);

  const handleSave = useCallback(() => {
    const isChanged = (Object.keys(user) as (keyof UserModel)[]).some((key) => editedUser[key] !== user[key]);

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
      <ModalContent>
        <CloseButton aria-label="close" onClick={onClose}>
          <Close />
        </CloseButton>

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
            menuItems={[...ADMIN_PLAN_OPTIONS, NO_PLAN_LABEL]}
            value={editedUser.plan}
            variant="standard"
            onChange={(event) => handleSelectChange(event, 'plan')}
          />

          <DropdownList
            id="status"
            label="Статус"
            menuItems={Object.values(UserStatus)}
            value={editedUser.status}
            variant="standard"
            onChange={(event) => handleSelectChange(event, 'status')}
          />
        </Stack>

        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ color: theme.palette.text.primary }}>
            Сохранить
          </Button>

          <Button variant="outlined" color="secondary" onClick={onClose}>
            Отмена
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  );
}

export default memo(AdminTableEditMenu);
