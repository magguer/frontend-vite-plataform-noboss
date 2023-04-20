type UserTypes = {
    user: {
        id: string;
        firstname: string;
        lastname: string;
        username: string;
        image_url: string;
        email: string;
        projects: [];
        roles: { name: string };
        token: string;
    };
};

export default UserTypes;
