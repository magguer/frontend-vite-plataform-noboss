export interface Project {
    name: string;
    password: string;
    slug: string;
    members: [];
    heading: { name: string; icon_url: string; _id: string };
    color_one: string;
    color_two: string;
    roles: { name: string }[];
    logo_url: string;
    banner_url: string;
    needs: [];
    ubication: string;
    projects_fav: [];
    public: boolean;
    provider: boolean;
    _id: string;
    networks: { fb: string; ig: string; ln: string };
    products_on: boolean;
    services_on: boolean;
    products: [];
    services: [];
    invested_money: number;
    sales_money: number;
    spent_money: number;
    categories: [{ _id: string }];
    sub_categories: [{ _id: string }];
    clients: [];
    user_clients: [];
    project_clients: [];
    orders: [];
    bookings: [];
    banned: boolean;
}

export interface ProjectType {
    project: Project;
}
