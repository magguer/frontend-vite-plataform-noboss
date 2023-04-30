type ClientTypes = {
    id: string;
    type: string;
    name: string;
    phone: string;
    email: string;
    project: string;
    clients: {
        id: string;
        type: string;
        name: string;
        phone: string;
        email: string;
        project: string;
    };
};

export default ClientTypes;
