type ProjectTypes = {
    name: string;
    slug: string;
    members: [];
    headings: { name: string }[];
    roles: [];
    logo_url: string;
    banners_url: [];
    needs: [];
    ubication: string;
    projects_fav: [];
    public: boolean;
    provider: boolean;
    id: string;
    networks: { fb: string; ig: string; ln: string };
    products: [];
    services: [];
    user_clients: [];
    project_clients: [];
    orders: [];
    bookings: [];
    banned: boolean;
    project: {
        name: string;
        slug: string;
        members: [];
        headings: { name: string }[];
        roles: [];
        logo_url: string;
        banners_url: [];
        needs: [];
        ubication: string;
        projects_fav: [];
        public: boolean;
        provider: boolean;
        id: string;
        networks: { fb: string; ig: string; ln: string };
        products: [];
        services: [];
        user_clients: [];
        project_clients: [];
        orders: [];
        bookings: [];
        banned: boolean;
    };
};

export default ProjectTypes;
