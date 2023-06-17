export interface Client {
    _id: string;
    type: string;
    name: string;
    phone: string;
    email: string;
    project: string;
}

export interface ClientType {
    client: Client;
}
