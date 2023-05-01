export interface User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    image_url: string;
    email: string;
    projects: [];
    role: { name: string };
    token: string;
}

export interface UserType {
    user: User;
}
