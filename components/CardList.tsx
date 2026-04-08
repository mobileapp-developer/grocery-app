import {ActivityIndicator, FlatList, Text} from "react-native";
import {useEffect, useState} from "react";
import {getProductsByCategoryId} from "@/db/products";
import ProductCard from "@/components/ProductCard";

type Product = {
    id: number;
    title: string;
    price: number;
    rating: number;
    image: string;
    category_id: number
}

const CardList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProductsByCategoryId(1);
                setProducts((data ?? []) as Product[]);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Failed to load products");
            } finally {
                setLoading(false)
            }
        };
        loadProducts();
    }, []);

    if (loading) return <ActivityIndicator/>
    if (error) return <Text>{error}</Text>

    return (
        <FlatList
            data={products.slice(0, 5)}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 16}}
            renderItem={({item}) => (
                <ProductCard
                    image={item.image}
                    title={item.title}
                    rating={item.rating}
                    price={item.price}
                />
            )}
        />
    )
};

export default CardList;