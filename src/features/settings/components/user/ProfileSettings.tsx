import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import UserModel from "../../../../core/ models/user_model";
import { useLoading } from "../../Settings";
import { useAuth } from "../../../../providers/AuthProvider";
import { Loading, updateUserData } from "../../../../core/datasources/admin_data_source";
import theme from "../../../../core/theme/darkTheme";


export default function ProfileSettings() {
	const {setLoading} = useLoading();
	const {user, setUser} = useAuth();
	const [editUser, setEditUser] = useState<UserModel>(user ?? {name: 'name', email: 'email'} as UserModel);

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
		const {name, value} = e.target;
		setEditUser((prev) => ({...prev, [name]: value}));
	}, []);

	const onClick = useCallback(() => {
		if (user?.email !== editUser.email || user?.name !== editUser.name) {
			try {
				Loading(() => updateUserData(editUser), setLoading);
			} finally {
				setUser(editUser)
			}
		}
	}, [editUser, user]);

    return (
		<Stack spacing={6} sx={{width: { xs: "100%", sm: "80%", md: "60%" }, mx: "auto", mt: { xs: 4, sm: 6, md: 8 }}}>
			<TextField name='name' value={editUser.name} label="Имя" onChange={(e) => onChange(e)} fullWidth size="medium" sx={{'& fieldset': { borderColor: theme.palette.background.paper }}}/>
		
			<TextField name='email' value={editUser.email} label="Эл. почта" onChange={(e) => onChange(e)} fullWidth size="medium" sx={{'& fieldset': { borderColor: theme.palette.background.paper }}}/>
		
			<Button variant="contained" fullWidth onClick={onClick} sx={{borderRadius: 3, color: theme.palette.text.primary}}>Сохранить изменения</Button>
		</Stack>
    );
}