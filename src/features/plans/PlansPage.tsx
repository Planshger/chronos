import { Box, Button, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material";
import { Done } from "@mui/icons-material";
import theme from "../../core/theme/darkTheme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useCallback, useEffect, useState } from "react";
import { Loading, updateUserData } from "../../core/datasources/admin_data_source";
import Loader from "../../core/components/Loader";
import UserModel from "../../core/ models/user_model";
import PlanModel from "../../core/ models/plan_model";
import { getAllPlans } from "../../core/datasources/plans_data_source";

export default function PlansPage() {
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const {user, token, setUser} = useAuth();

    const savePlanFromUser = useCallback(async (namePlan: string) => {
        if (user?.role === 'user') {
            await Loading(() => updateUserData({...user, plan: namePlan, status: 'Активен'} as UserModel).then(res => setUser(res)), setLoading);
            navigate('/schedule');
        } else {
            navigate('/register');
        }
    }, [user, token])

    useEffect( () => {Loading(() => getAllPlans().then(res => setPlans(res)), setLoading)}, []);

    return (
        <Paper sx={{height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper,  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto'}}>
            <Box sx={{pt: 5, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Typography variant="h3" sx={{fontSize: '35px', mb: 3}}>
                    Выберите ваш тариф
                </Typography>

                <Typography variant="h6" sx={{color: theme.palette.text.secondary, maxWidth: 600, mx: 'auto', mb: 5, fontSize: '17px', pr: 4, pl: 4, textAlign: 'center'}}>
                    Выберите план, который лучше всего подходит для ваших нужд.
                </Typography>
            </Box>

            <Grid container spacing={8} sx={{justifyContent: 'center', ml: 2, mr: 2, mt: 3}}>
                {plans.map((p, i) => (
                    <Grid key={p.name} sx={{display: 'flex', justifyContent: 'center', pb: i === plans.length - 1 ? 2 : 0}} size={{xs: 10.5, sm: 6, md: 4, lg: 3}}>
                        <Card sx={{height: '100%', width: '100%', bgcolor: theme.palette.background.default, borderRadius: 4, border: p.popular ? `2px solid ${theme.palette.text.primary}` : `1px solid ${theme.custom.border.light}`, boxShadow: theme.custom.shadows.sm, transform: p.popular ? 'scale(1.1)' : ''}}>
                            <CardContent sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                {p.popular ? <Box sx={{bgcolor: theme.palette.text.primary, textAlign: 'center', borderRadius: '20px', width: '130px'}}><Typography variant="h2" sx={{textTransform: 'uppercase', color: theme.palette.background.default, fontSize: '13px', mb: 0.5, mt: 0.5}}>Хит продаж</Typography></Box> : ''}

                                <Typography variant="h3" sx={{pb: 1, pt: 2}}>{p.name}</Typography>

                                <Typography variant="h2" sx={{pb: 1}}>{p.price} {p.trial ? '₽' : '₽ / мес'}</Typography>

                                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{p.description}</Typography>

                                <Stack direction="column" spacing={3} sx={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pt: 4}}>
                                    <Stack direction="column" spacing={3}>
                                        {p.features.map((f) => (
                                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                                <Done sx={{width: 20, height: 20, color: 'grey'}}/>
                                                <Typography variant="h3" sx={{fontSize: '15px', ml: 1}}>{f}</Typography>
                                            </Box>    
                                        ))}
                                    </Stack>

                                    <Button variant="contained" onClick={() => savePlanFromUser(p.name)} sx={{borderRadius: '10px', bgcolor: p.popular ? theme.palette.text.primary : theme.palette.background.paper, color: p.popular ? theme.palette.background.default : theme.palette.text.primary, fontSize: p.popular ? '16px' : '14px', boxShadow: 'none', border: `1px solid ${theme.custom.border.light}`, '&:hover': {boxShadow: '0 15px 25px -5px #a855f7'}}}>
                                        Выбрать {p.name}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {loading && (
                <Loader size={80} />
            )}
        </Paper>
    )
}