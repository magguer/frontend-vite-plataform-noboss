type MovementTypes = {
    id: string;
    type: string;
    reason: string;
    amount: number;
    project: string;
    user: string;
    movements: {
        id: string;
        type: string;
        reason: string;
        amount: number;
        project: string;
        user: string;
    };
};

export default MovementTypes;
