import { Done } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import theme from "../../../../core/theme/darkTheme";
import { useCallback, useEffect, useRef, useState } from "react";
import PlanModel from "../../../../core/ models/plan_model";
import { Loading } from "../../../../core/datasources/admin_data_source";
import { getAllPlans, updatePlanData } from "../../../../core/datasources/plans_data_source";
import { useLoading } from "../../Settings";
import AdminEditManagePlansSettings from "./AdminEditManagePlansSettings";

export default function AdminManagePlansSettings() {
    const {setLoading} = useLoading();
    const [plans, setPlans] = useState<PlanModel[]>([]);
    const [openEdit, setOpenEdit] = useState<{open: boolean, plan: PlanModel}>({open: false, plan: {} as PlanModel});

    const loadData = useCallback(() => {
        Loading(() => getAllPlans().then(res => setPlans(res)), setLoading);
    }, []);

    const switchEditMenu = useCallback((plan?: PlanModel) =>  {
        setOpenEdit((prev) => {
          if (plan) return { open: !prev.open, plan };
          else return { open: !prev.open, plan: prev.plan };
        });
      }, []);
     
    const loadDataWithEditPlan = useCallback(async (plan: PlanModel) => {
        await updatePlanData(plan);
        loadData();
      }, []);

    useEffect(() => {loadData()}, []);

    return (
        <Box sx={{ width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden', pb: 2, '&::-webkit-scrollbar': { width: 8 }, '&::-webkit-scrollbar-thumb': { bgcolor: theme.custom.border.light, borderRadius: 4 } }}>
            <Box sx={{ display: 'grid', gap: 4, justifyContent: 'center', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' }, width: '100%' }}>
                {plans.map((p) => (
                    <Card key={p.name} sx={{ display: 'flex', flexDirection: 'column', width: '100%', bgcolor: theme.palette.background.default, borderRadius: 4, border: p.popular ? `2px solid ${theme.palette.text.primary}` : `1px solid ${theme.custom.border.light}`, boxShadow: theme.custom.shadows.sm, outline: p.popular ? `1px solid ${theme.palette.text.primary}` : 'none' }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {p.popular ? <Box sx={{ bgcolor: theme.palette.text.primary, textAlign: 'center', borderRadius: '20px', width: '130px' }}><Typography variant="h2" sx={{ textTransform: 'uppercase', color: theme.palette.background.default, fontSize: '13px', mb: 0.5, mt: 0.5 }}>Хит продаж</Typography></Box> : ''}

                            <Typography variant="h3" sx={{ pb: 1, pt: 2 }}>{p.name}</Typography>

                            <Typography variant="h2" sx={{ pb: 1 }}>{p.price} {p.trial ? '₽' : '₽ / мес'}</Typography>

                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>{p.description}</Typography>

                            <Stack direction="column" spacing={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pt: 4 }}>
                                <Stack direction="column" spacing={3}>
                                    {p.features.map((f) => (
                                        <Box key={f} sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Done sx={{ width: 20, height: 20, color: 'grey' }} />
                                            <Typography variant="h3" sx={{ fontSize: '15px', ml: 1 }}>{f}</Typography>
                                        </Box>
                                    ))}
                                </Stack>

                                <Button variant="contained" onClick={() => setOpenEdit({plan: p, open: true})} sx={{ borderRadius: '10px', bgcolor: p.popular ? theme.palette.text.primary : theme.palette.background.paper, color: p.popular ? theme.palette.background.default : theme.palette.text.primary, fontSize: p.popular ? '16px' : '14px', boxShadow: 'none', border: `1px solid ${theme.custom.border.light}`, '&:hover': { boxShadow: '0 15px 25px -5px #a855f7' } }}>
                                    Редактировать
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            
            <AdminEditManagePlansSettings onClose={switchEditMenu} onClick={loadDataWithEditPlan} open={openEdit.open} plan={openEdit.plan} />
        </Box>
    );
}