type ProductTypes = {
    id: string;
    model: string;
    slug: string;
    subname: string;
    description: string;
    details: {};
    sub_category: { name: string };
    project: string;
    images_url: number[];
    orders: [];
    price: number;
    cost: number;
    stock: number;
    providers: [];
    product: {
        id: string;
        model: string;
        slug: string;
        subname: string;
        description: string;
        details: {};
        sub_category: { name: string };
        project: string;
        images_url: number[];
        orders: [];
        price: number;
        cost: number;
        stock: number;
        providers: [];
    };
};

export default ProductTypes;
