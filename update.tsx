// import { Box, Typography, IconButton, Button, Paper, Grid, Dialog, DialogTitle, DialogContent, Avatar,TextField, Chip, Stack} from '@mui/material';
// import { BarChart, Add, Close, LocationOn, AutoAwesome, ExpandMore, Message} from '@mui/icons-material';
// import { useState } from 'react';
// import theme from '../../../core/theme/theme';
// import { TaskModel } from '../data/models/TaskModel';
// import { format } from 'date-fns/format';
// import TaskCreateDialogContent from './TaskCreateDialogContent';

// interface OptionsDialogProps {
//     activeModal: string | null;
//     setActiveModal: Function;
//     selectedDate: Date | null;
//     tasks: TaskModel;

//     // TaskCreateProps
//     newTaskTitle: string;
//     setNewTaskTitle: (title: string) => void;
//     newTaskDescription: string;
//     setNewTaskDescription: (description: string) => void;
//     newTaskType: string;
//     setNewTaskType: (type: string) => void;
//     handleSaveTask: () => void;
// }

// export default function OptionsDialog({activeModal, setActiveModal, selectedDate, tasks, newTaskTitle, setNewTaskTitle, newTaskDescription, setNewTaskDescription, newTaskType, setNewTaskType, handleSaveTask}: OptionsDialogProps) {
//     const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

//     return (
//       <Dialog open={activeModal !== null} onClose={() => setActiveModal(null)} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{borderBottom: `1px solid ${theme.custom.border.light}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//           <Typography variant="h6">
//             {activeModal === 'task_create' ? 'Новое событие' :
//              activeModal === 'tasks_list' ? 'События дня' :
//              activeModal === 'profile_settings' ? 'Настройки профиля' :
//              activeModal === 'manage_plans' ? 'Мой тариф' :
//              activeModal === 'analytics' ? 'Аналитика' :
//              activeModal === 'maps_settings' ? 'Настройка карт' :
//              activeModal === 'messengers' ? 'Мессенджеры' :
//              'Бронирование'}
//           </Typography>

//           <Stack direction="row" spacing={1}>
//             {activeModal === 'tasks_list' && <IconButton size="small" onClick={() => setActiveModal('task_create')}><Add fontSize="small" color="primary"/></IconButton>}
//             <IconButton size="small" onClick={() => setActiveModal(null)}><Close fontSize="small" /></IconButton>
//           </Stack>
//         </DialogTitle>

//         <DialogContent dividers sx={{py: 3}}>
//           {['taxi', 'hotel', 'restaurant'].includes(activeModal || '') ? (
//             <Stack spacing={3}>
//               <Box sx={{width: '100%', height: 180, bgcolor: theme.palette.action.hover, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'}}>
//                 <LocationOn sx={{fontSize: 40, color: theme.palette.primary.main, zIndex: 1}} />
//                 <Box sx={{position: 'absolute', inset: 0, opacity: 0.15, backgroundSize: 'cover', backgroundPosition: 'center'}} />
//               </Box>

//               <TextField fullWidth placeholder="Укажите место..." variant="outlined" size="small" />

//               <Button fullWidth variant="contained" sx={{borderRadius: 3}}>Подтвердить бронирование</Button>
//             </Stack>
//           ) : 

//           activeModal === 'profile_settings' ? (
//             <Stack spacing={3}>
//               <TextField label="Имя" defaultValue="Иван Иванов" fullWidth size="small" />

//               <TextField label="Эл. почта" defaultValue="ivan@example.com" fullWidth size="small" />

//               <Button variant="contained" fullWidth sx={{borderRadius: 3}}>Сохранить изменения</Button>
//             </Stack>
//           ) : 
          
//           activeModal === 'manage_plans' ? (
//             <Stack spacing={3} sx={{alignItems: "center"}}>
//               <Avatar sx={{width: 64, height: 64, bgcolor: 'warning.main', background: 'linear-gradient(135deg, #f59e0b, #f97316)'}}><AutoAwesome fontSize="large" sx={{color: '#fff'}} /></Avatar>

//               <Typography variant="h5">Премиум</Typography>

//               <Typography variant="body2" color="text.secondary">Активен до 12 октября 2026 г.</Typography>

//               <Button variant="outlined" color="error" fullWidth sx={{borderRadius: 3}}>Отменить подписку</Button>
//             </Stack>
//           ) : 
          
//           activeModal === 'analytics' ? (
//             <Stack spacing={3}>
//               <Grid container spacing={2}>
//                 <Paper sx={{p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'primary.contrastText'}}><Typography variant="h4" >24</Typography><Typography variant="caption">Задачи за месяц</Typography></Paper>
//                 <Paper sx={{p: 2, textAlign: 'center', bgcolor: 'secondary.light', color: 'secondary.contrastText'}}><Typography variant="h4">8</Typography><Typography variant="caption">Встречи</Typography></Paper>
//               </Grid>

//               <Paper sx={{p: 4, textAlign: 'center', color: 'text.secondary', height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
//                 <BarChart sx={{fontSize: 40, opacity: 0.3, mb: 1}} />
//                 <Typography variant="body2">График активности</Typography>
//               </Paper>
//             </Stack>
//           ) : 
          
//           activeModal === 'maps_settings' ? (
//             <Stack spacing={2}>
//               <Typography variant="body2" color="text.secondary">Выберите предпочтительный сервис для вызова такси и маршрутов.</Typography>

//               <Paper variant="outlined" sx={{p: 2, borderColor: theme.palette.primary.main, bgcolor: theme.palette.primary.main + '08', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//                 <Typography>Яндекс Go</Typography>
//                 <input type="radio" name="map" defaultChecked />
//               </Paper>

//               <Paper variant="outlined" sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//                 <Typography>Google Maps</Typography>
//                 <input type="radio" name="map" />
//               </Paper>
//             </Stack>
//           ) : 
          
//           activeModal === 'messengers' ? (
//             <Stack spacing={2}>
//               <Typography variant="body2" color="text.secondary">Подключите мессенджеры для получения уведомлений и связи с ИИ.</Typography>

//               <Button variant="contained" startIcon={<Message />} sx={{bgcolor: '#0088cc', '&:hover': {bgcolor: '#0077b3'}, borderRadius: 3}}>Подключить Telegram</Button>

//               <Button variant="contained" startIcon={<Message />} sx={{bgcolor: '#25D366', '&:hover': {bgcolor: '#20bd5a'}, borderRadius: 3}}>Подключить WhatsApp</Button>
//             </Stack>
//           ) : 
          
//           activeModal === 'tasks_list' ? (
//             <Stack spacing={2}>
//               {selectedDate && tasks[format(selectedDate, 'yyyy-MM-dd')]?.map((task) => (
//                 <Paper key={task.id} variant="outlined" sx={{p: 2, borderRadius: 3}}>
//                   <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
//                     <Box>
//                       <Chip label={task.type === 'встреча' ? 'Встреча' : 'Задача'} size="small" color={task.type === 'встреча' ? 'secondary' : 'primary'} sx={{mb: 0.5, fontSize: '0.6rem', height: 20}} />
//                       <Typography variant="body2">{task.title}</Typography>
//                     </Box>
                    
//                     <IconButton size="small" onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}>
//                       <ExpandMore sx={{transition: 'transform 0.2s', transform: expandedTaskId === task.id ? 'rotate(180deg)' : 'none'}} />
//                     </IconButton>
//                   </Stack>
//                   {expandedTaskId === task.id && <Typography variant="body2" color="text.secondary" sx={{mt: 1, pt: 1, borderTop: `1px solid ${theme.custom.border.light}`}}>{task.description || 'Нет описания'}</Typography>}
//                 </Paper>
//               ))}
//             </Stack>
//           ) : 
          
//           activeModal === 'task_create' ? (
//             <TaskCreateDialogContent newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} newTaskDescription={newTaskDescription} setNewTaskDescription={setNewTaskDescription} newTaskType={newTaskType} setNewTaskType={setNewTaskType} handleSaveTask={handleSaveTask}/>
//           ) : null}
//         </DialogContent>
//       </Dialog>
//     );
// }