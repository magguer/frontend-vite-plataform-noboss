export interface Client {
    _id: string;
    type: string;
    name: string;
    phone: string;
    email: string;
    project: string;
    orders: object[];
    orders_quantity: number;
    bookings: object[];
    bookings_quantity: number;
}

export interface ClientType {
    client: Client;
}
