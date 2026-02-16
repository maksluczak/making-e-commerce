import ProductPage from "@/components/Shopping/ProductPage";
import { apiClient } from "@/services/api-client";
import { ProductType } from "@/types/cart.types";

export default async function Page({ params }: {
    params: Promise<{ product: string }>;
}) {
    const { product } = await params;

    const item = await apiClient.get<ProductType>(`/item/${product}`);

    if (!item) {
        return <div>Nie znaleziono produktu.</div>;
    }

    return <ProductPage product={item} />;
}