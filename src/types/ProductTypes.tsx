export interface Product {
    id: string;
    _id: string;
    model: string;
    slug: string;
    subname: string;
    description: string;
    details: {};
    category: { name: string; slug: string };
    sub_category: { name: string; slug: string };
    project: string;
    images_url: number[];
    orders: [];
    price: number;
    cost: number;
    stock: number;
    providers: [];
}

export interface ProductType {
    product: Product;
}
