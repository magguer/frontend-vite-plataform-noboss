type ProductsTypes = {
    id: string;
    name: string;
    slug: string;
    subname: string;
    description: string;
    details: {};
    subcategories: [string];
    project: string;
    images_url: [];
    orders: [];
    price: number;
    cost: number;
    stock: number;
    providers: [];
    products: {
        name: string;
        slug: string;
        subname: string;
        description: string;
        details: {};
        subcategories: [{}];
        project: string;
        images_url: [];
        orders: [];
        price: number;
        cost: number;
        stock: number;
        providers: [];
    };
};

export default ProductsTypes;
