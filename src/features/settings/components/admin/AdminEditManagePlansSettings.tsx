import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import PlanModel from "../../../../core/ models/plan_model";
import theme from "../../../../core/theme/darkTheme";
import NumberField from "../../../../core/components/NumberField";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg: '50%', xs: '95%'},
  bgcolor: 'background.paper',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: 24,
  borderRadius: '20px',
  p: 5,
};

interface AdminEditManagePlansSettingsProps {
    onClick: (plan: PlanModel) => void;
    onClose: () => void;
    open: boolean;
    plan: PlanModel;
}

function monthsToDisplay(days: number, isTrial?: boolean): number { 
    return isTrial ? days : Math.round(days / 30)
};

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

function AdminEditManagePlansSettings({onClick, onClose, open, plan}: AdminEditManagePlansSettingsProps) {
    const [editedPlan, setEditedPlan] = useState<PlanModel>(plan);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedPlan((prev) => { return {...prev, [name]: value}});
    }, [editedPlan]);

    const handleFeaturesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPlan((prev) => ({...prev, features: textToFeatures(e.target.value)}));
    }, [editedPlan]);

    const handleValueChange = useCallback((name: keyof PlanModel, value: number | null) => {
        setEditedPlan((prev) => ({ ...prev, [name]: value ?? plan[name] }));
    }, [editedPlan]);

    const handleTrialChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPlan((prev) => ({
            ...prev,
            trial: e.target.checked,
            durationOfActivity: e.target.checked ? daysToBackend(prev.durationOfActivity, false)  : monthsToDisplay(prev.durationOfActivity, false),   
        }));
    }, [editedPlan]);

    const handlePopularChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPlan((prev) => ({...prev, popular: e.target.checked}));
    }, [editedPlan]);

    const handleSave = useCallback(() => {
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

        if (isChanged) onClick(planToSend);
        onClose();
    }, [plan, editedPlan, onClick, onClose]);

    useEffect(() => {setEditedPlan({...plan, durationOfActivity: monthsToDisplay(plan.durationOfActivity, plan.trial)})}, [plan]);
    
    return (
        <Modal open={open} onClose={(reason) => {if(reason !== 'backdropClick') return; onClose();}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <IconButton aria-label="close" onClick={onClose} sx={{position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500]}}>
                    <Close/>
                </IconButton>

                <Typography variant="h6" align="center" sx={{mt: 2, mb: 2}}>Редактировать тарифный план <span style={{color: theme.palette.primary.main, textDecoration: 'underline'}}>{editedPlan.name}</span></Typography>

                <Stack spacing={2} sx={{mt: 3}}>
                    <TextField name="name" id="outlined-basic" label="Название" variant="standard" value={editedPlan.name} onChange={handleChange} sx={{'& input::-webkit-contacts-auto-fill-button': {visibility: 'hidden'}}}/>

                    <TextField name="description" id="filled-textarea" label="Описание" variant="filled" multiline value={editedPlan.description} onChange={handleChange} sx={{'& input::-webkit-contacts-auto-fill-button': {visibility: 'hidden'}}}/>

                    <Stack direction={'row'} spacing={3}>
                        <NumberField name='price' label="Прайс(RUB)" size="small" value={editedPlan.price} onValueChange={(value) => handleValueChange('price', value)}/>

                        <NumberField name='durationOfActivity' label={`Длительность(${editedPlan.trial ? 'дней' : 'месяц'})`} size="small" value={editedPlan.durationOfActivity} onValueChange={(value) => handleValueChange('durationOfActivity', value)}/>
                    </Stack>

                    <TextField name="features" id="features-textarea" label="Возможности (по одной на строку)" variant="filled" multiline minRows={4} value={featuresToText(editedPlan.features)} onChange={handleFeaturesChange} sx={{'& input::-webkit-contacts-auto-fill-button': { visibility: 'hidden' }}}/>

                    <Stack direction={'row'} spacing={3}>
                        <Stack direction={'row'}>
                            <Typography variant="h6" sx={{fontSize: '15px', pt: 0.8}}>Пробный</Typography>

                            <Switch  checked={editedPlan.trial ?? false} onChange={handleTrialChange} color="secondary"/>
                        </Stack>

                        <Stack direction={'row'}>
                            <Typography variant="h6" sx={{fontSize: '15px', pt: 0.8}}>Популярный</Typography>

                            <Switch  checked={editedPlan.popular ?? false} onChange={handlePopularChange} color="secondary"/>
                        </Stack>
                    </Stack>
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

export default memo(AdminEditManagePlansSettings); 