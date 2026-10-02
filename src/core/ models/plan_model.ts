export default interface PlanModel {
    id?: number,
    name: string,
    price: number,
    features: string[],
    description: string,
    durationOfActivity: number,  
    popular: boolean,
    trial: boolean,
}
