import { Box, Button, Card, CardContent, Grid, Paper, Stack, Typography } from "@mui/material";
import { Done } from "@mui/icons-material";
import theme from "../../core/theme/darkTheme";
import { useNavigate } from "react-router-dom";

export default function PlansPage() {
    const plans = [{name: 'Базовый', price: '666 ₽ / мес', description: 'Базовые инструменты для личной продуктивности.',features: ['Заказ такси через веб-форму','Бронирование отелей','Резервирование столиков','Список задач']},{name: 'Премиум', price: '999 ₽ / мес', description: 'Расширенные функции для максимальной эффективности.',features: ['Всё из Базового','ИИ-ассистент','Интеграция с мессенджерами (Telegram, WhatsApp)','Анализ времени и статистика','Возможность поделиться расписанием'],popular: true},{name: 'Пробный (7 Дней)',price: '0 ₽',description: 'Опробуйте все функции Премиум бесплатно.',features: ['Все функции тарифа Премиум','Привязка карты не требуется','Отмена в любой момент']}];
    const navigate = useNavigate();

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

            <Grid container spacing={8} sx={{justifyContent: 'center'}}>
                {plans.map((p, i) => (
                    <Grid key={p.name} sx={{display: 'flex', justifyContent: 'center', pb: i === plans.length - 1 ? 2 : 0}} size={{xs: 10.5, sm: 6, md: 4, lg: 3}}>
                        <Card sx={{height: '100%', width: '100%', bgcolor: theme.palette.background.default, borderRadius: 4, border: p.popular ? `2px solid ${theme.palette.text.primary}` : `1px solid ${theme.custom.border.light}`, boxShadow: theme.custom.shadows.sm, transform: p.popular ? 'scale(1.1)' : ''}}>
                            <CardContent sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                {p.popular ? <Box sx={{bgcolor: theme.palette.text.primary, textAlign: 'center', borderRadius: '20px', width: '130px'}}><Typography variant="h2" sx={{textTransform: 'uppercase', color: theme.palette.background.default, fontSize: '13px', mb: 0.5, mt: 0.5}}>Хит продаж</Typography></Box> : ''}

                                <Typography variant="h3" sx={{pb: 1, pt: 2}}>{p.name}</Typography>

                                <Typography variant="h2" sx={{pb: 1}}>{p.price}</Typography>

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

                                    <Button variant="contained" onClick={() => navigate('/schedule')} sx={{borderRadius: '10px', bgcolor: p.popular ? theme.palette.text.primary : theme.palette.background.paper, color: p.popular ? theme.palette.background.default : theme.palette.text.primary, fontSize: p.popular ? '16px' : '14px', boxShadow: 'none', border: `1px solid ${theme.custom.border.light}`, '&:hover': {boxShadow: '0 15px 25px -5px #a855f7'}}}>
                                        Выбрать {p.name}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}