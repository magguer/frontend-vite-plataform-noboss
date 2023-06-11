export interface Movement {
    id: string;
    type: string;
    reason: string;
    amount: number;
    project: string;
    user: { username: string };
    createdAt: string;
}

export interface MovementType {
    movement: Movement;
}
