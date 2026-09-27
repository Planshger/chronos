import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, Modal, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import theme from "../../../../core/theme/darkTheme";
import UserModel from "../../models/user_model";
import React from "react";
import DropdownList from "../DropdownList";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg: 400, xs: 370},
  bgcolor: 'background.paper',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: 24,
  borderRadius: '20px',
  p: 5,
};

interface AdminTableEditMenuProps {
    onClick: (user: UserModel) => void;
    onClose: () => void;
    open: boolean;
    user: UserModel;
}

function AdminTableEditMenu({onClick, onClose, open, user}: AdminTableEditMenuProps) {
    const [editedUser, setEditedUser] = React.useState<UserModel>(user);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedUser((prev) => { return {...prev, [name]: value}});
    }, []);

    const handleSelectChange = useCallback((event: SelectChangeEvent<string>, id: string) => {
        setEditedUser((prev) => {return {...prev, [id as keyof UserModel]: event.target.value}})
    }, []);

    const handleSave = useCallback(() => {
        const isChanged = (Object.keys(user) as (keyof UserModel)[]).some(
            (key) => editedUser[key] !== user[key]
        );

        if (isChanged) {onClick(editedUser);}
        onClose();
    }, [user, editedUser])

    React.useEffect(() => {setEditedUser(user);}, [user]);
    
    return (
        <Modal open={open} onClose={(reason) => {if(reason !== 'backdropClick') return; onClose();}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <IconButton aria-label="close" onClick={onClose} sx={{position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500]}}>
                    <Close/>
                </IconButton>

                <Typography variant="h6" align="center" sx={{mt: 2, mb: 2}}>Редактировать пользователя</Typography>

                <Stack spacing={2} sx={{mt: 3}}>
                    <TextField name="name" id="outlined-basic" label="Пользователь" variant="standard" value={editedUser.name} onChange={handleChange} sx={{'& input::-webkit-contacts-auto-fill-button': {visibility: 'hidden'}}}/>

                    <TextField name="email" id="filled-basic" label="Email" variant="standard" value={editedUser.email} onChange={handleChange} sx={{'& input::-webkit-contacts-auto-fill-button': {visibility: 'hidden'}}}/>

                    <DropdownList id='plan' label='Тариф' menuItems={['Базовый', 'Премиум', 'Пробный']} value={editedUser.plan} variant='standard' onChange={(event) => handleSelectChange(event, 'plan')}/>
                        
                    <DropdownList id='status' label='Статус' menuItems={['Активен', 'Заблокирован', 'Ожидает']} value={editedUser.status} variant='standard' onChange={(event) => handleSelectChange(event, 'status')}/>
                </Stack>

                <Stack direction="row" spacing={2} sx={{mt: 3, justifyContent: 'center'}}>
                    <Button variant="contained" color="primary" onClick={handleSave} sx={{color: theme.palette.text.primary}}>
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