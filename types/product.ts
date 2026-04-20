export type Product = {
    id: number;
    title: string;
    price: number;
    rating: number;
    image: string;
};

export type CardListProps = {
    category_id: number;
};

export type CartItem = {
    product: Product;
    quantity: number;
};