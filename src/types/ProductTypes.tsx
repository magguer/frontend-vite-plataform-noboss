type ProductTypes = {
    id: string;
    name: string;
    slug: string;
    subname: string;
    description: string;
    details: {};
    sub_category: string;
    project: string;
    images_url: [];
    orders: [];
    price: number;
    cost: number;
    stock: number;
    providers: [];
    product: {
        id: string;
        name: string;
        slug: string;
        subname: string;
        description: string;
        details: {};
        sub_category: string;
        project: string;
        images_url: [];
        orders: [];
        price: number;
        cost: number;
        stock: number;
        providers: [];
    };
};

export default ProductTypes;
