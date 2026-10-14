export default interface PlanModel {
    id?: number,
    name: string,
    price: number,
    features: string[],
    description: string,
    durationOfActivity: number,  
    popular: boolean,
    trial: boolean,
    active: boolean
}

export const initialPlan: PlanModel = {
  id: 0,
  name: '',
  price: 0,
  features: [],
  description: '',
  durationOfActivity: 0,
  popular: false,
  trial: false,
  active: false,
};

