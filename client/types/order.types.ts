export type OrderType = {
    message: "Successfully placed order";
    order: {
        id: number;
        amount: number;
        address: string;
        status: string;
        paymentType: string;
        isPaid: boolean;
        userId: number;
        items: {
            id: number;
            size: string;
            price: number;
            quantity: number;
            orderId: number;
            itemId: number;
        }[];
    }
}