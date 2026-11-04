import PlanModel from '../models/plan_model';
import { apiRequest } from '../../../shared/api/apiRequest';
import { queryClient } from '../../../shared/queryClient';

export function getAllPlans(): Promise<PlanModel[]> {
  return queryClient.fetchQuery({
    queryKey: ['plans'],
    queryFn: () => apiRequest<PlanModel[]>('/plans'),
  });
}

export function addPlan(plan: PlanModel): Promise<PlanModel> {
  return apiRequest<PlanModel>('/plans', {
    method: 'POST',
    body: JSON.stringify(plan),
  });
}

export async function deletePlans(idToDelete: number) {
  await apiRequest<void>(`/plans/${idToDelete}`, { method: 'DELETE' });
}

export async function updatePlanData(plan: PlanModel): Promise<PlanModel> {
  return apiRequest<PlanModel>(`/plans/${plan.id}`, {
    method: 'PATCH',
    body: JSON.stringify(plan),
  });
}
