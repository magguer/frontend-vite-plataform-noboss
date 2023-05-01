export interface Movement {
    id: string;
    type: string;
    reason: string;
    amount: number;
    project: string;
    user: string;
}

export interface MovementType {
    movement: Movement;
}
