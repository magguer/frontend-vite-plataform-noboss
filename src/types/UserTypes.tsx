type UserTypes = {
    user: {
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
