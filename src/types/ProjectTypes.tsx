type ProjectTypes = {
    name: string;
    slug: string;
    members: [];
    headings: { name: string; icon_url: string }[];
    roles: { name: string }[];
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
    categories: [{ slug: string }];
    sub_categories: [{ slug: string }];
    user_clients: [];
    project_clients: [];
    orders: [];
    bookings: [];
    banned: boolean;
    project: {
        name: string;
        slug: string;
        members: [];
        headings: { name: string; icon_url: string }[];
        roles: { name: string };
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
        categories: [{ slug: string }];
        sub_categories: [{ slug: string }];
        user_clients: [];
        project_clients: [];
        orders: [];
        bookings: [];
        banned: boolean;
    };
};

export default ProjectTypes;
