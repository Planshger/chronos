import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import theme from "../../../core/theme/darkTheme";
import { Box, Chip, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { CalendarToday, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ru } from "date-fns/locale";
import { TaskModel } from "../models/TaskModel";

interface CalendaryProps {
	currentMonth: Date;
	prevMonth: () => void;
	nextMonth: () => void;
	setSelectedDate: Function;
	selectedDate: Date | null;
	tasks: TaskModel; 
}

export default function Calendary({currentMonth, prevMonth, nextMonth, selectedDate, tasks, setSelectedDate}: CalendaryProps) {
	const today = new Date();
	const monthStart = startOfMonth(currentMonth);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
	const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
	const days = eachDayOfInterval({ start: startDate, end: endDate });

	return (
		<Paper sx={{ p: 3, borderRadius: 7, bgcolor: theme.palette.background.default, border: `1px solid ${theme.custom.border.light}`, boxShadow: theme.custom.shadows.sm }}>
			<Stack direction="row" sx={{ mb: 3, position: 'relative', zIndex: 1, alignItems: "center", justifyContent: "space-between" }}>
				<Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Box sx={{ p: 0.8, bgcolor: 'primary.main', borderRadius: 2, display: 'flex' }}>
						<CalendarToday sx={{ fontSize: 20, color: '#fff' }} />
					</Box>
					Расписание
				</Typography>

				<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
					<IconButton onClick={prevMonth} size="small"><ChevronLeft sx={{color: theme.custom.accent.amber}}/></IconButton>

					<Typography variant="body1" sx={{ width: 120, textAlign: 'center', textTransform: 'capitalize' }}>
						{format(currentMonth, 'LLLL yyyy', { locale: ru })}
					</Typography>

					<IconButton onClick={nextMonth} size="small"><ChevronRight sx={{color: theme.custom.accent.amber}}/></IconButton>
				</Stack>
			</Stack>

			<Stack direction={'column'} spacing={3}>
				<Grid container spacing={17} sx={{ pl: 6 }}>
					{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
						<Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, py: 0.5, fontWeight: "bold", color: theme.palette.text.secondary }}>
							{day}
						</Typography>
					))}
				</Grid>
				
				<Grid container spacing={2} columns={7}>
					{days.map((date, i) => {
						const dateKey = format(date, 'yyyy-MM-dd');
						const isToday = dateKey === format(today, 'yyyy-MM-dd');
						const isSelected = selectedDate && dateKey === format(selectedDate, 'yyyy-MM-dd');
						const dayTasks = tasks[dateKey] || [];
						const isCurrentMonth = isSameMonth(date, monthStart);

						return (
							<Grid key={i} size={1}>
								<Box onClick={() => setSelectedDate(date)} sx={{ minHeight: 105, minWidth: 100, pb: 3, pl: 1.5, pr: 3, borderRadius: 3, cursor: 'pointer', border: '1px solid transparent', bgcolor: isSelected ? theme.custom.accent.amber : 'transparent', color: isSelected ? 'primary.contrastText' : 'text.primary', opacity: isCurrentMonth ? 1 : 0.4, filter: isCurrentMonth ? 'none' : 'grayscale(0.5)', '&:hover': { bgcolor: isSelected ? theme.custom.accent.amber : theme.palette.action.hover } }}>
									<Typography variant="body1" sx={{ fontWeight: 600, borderRadius: '50%', bgcolor: isToday && !isSelected ? 'primary.main' : 'transparent', color: isToday && !isSelected ? 'primary.contrastText' : 'inherit', width: 32, height: 32, textAlign: 'center', lineHeight: '32px' }}>
										{format(date, 'd')}
									</Typography>
									
									<Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
										{dayTasks.slice(0, 2).map((task) => (
											<Chip key={task.id} label={task.title} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20, bgcolor: task.type === 'встреча' ? 'secondary.light' : 'primary.light', color: task.type === 'встреча' ? 'secondary.contrastText' : 'primary.contrastText', border: 'none', '& .MuiChip-label': { px: 1, fontWeight: 500 } }} />
										))}
										{dayTasks.length > 2 && <Typography variant="caption" color="text.secondary">+{dayTasks.length - 2} ещё</Typography>}
									</Box>
								</Box>
							</Grid>
						);
					})}
				</Grid>
			</Stack>
		</Paper>
	);
}