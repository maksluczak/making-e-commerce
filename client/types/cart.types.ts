export type ProductType = {
    id: number;
    name: string;
    description: string;
    gender: string;
    category: string;
    color: string;
    price: number;
    imageUrl: string;
    variants: { size: string; stock: number }[];
};

export type CartItemQuantityProps = {
    quantity: number;
    setQuantity: (quantity: number) => void;
};
