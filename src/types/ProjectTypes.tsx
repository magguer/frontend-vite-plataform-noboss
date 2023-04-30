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
    products_on: boolean;
    services_on: boolean;
    products: [];
    services: [];
    invested_money: number;
    sales_money: number;
    spent_money: number;
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
        products_on: boolean;
        services_on: boolean;
        products: [];
        services: [];
        invested_money: number;
        sales_money: number;
        spent_money: number;
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
