import PlanModel from "../ models/plan_model";
import { API_BASE_URL } from "../api/URL";


export function getAllPlans(): Promise<PlanModel[]> {
    return fetch(`${API_BASE_URL}/plans`, {method: 'GET'}).then(res => res.json());
}

export async function deletePlans(idsToDelete: number[]) {
    for (const id of idsToDelete) {
        await fetch(`${API_BASE_URL}/plans/${id}`, { method: 'DELETE' });
    }
}

export async function updatePlanData(plan: PlanModel): Promise<PlanModel> {
    const res = await fetch(`${API_BASE_URL}/plans/${plan.id}`, {method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(plan)})
    return res.json()
}