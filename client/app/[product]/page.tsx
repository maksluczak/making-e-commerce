import ProductPage from "@/components/Shopping/ProductPage";

export default async function Page({ params }: { params: { product: string }; }) {
    const { product } = await params;

    const data = await fetch(`${process.env.API_URL}/item/${product}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const item = await data.json();

    return <ProductPage product={item} />;
}
