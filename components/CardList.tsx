import {ActivityIndicator, FlatList, Text, Alert} from "react-native";
import {useEffect, useState} from "react";
import {getProductsByCategoryId} from "@/db/products";
import ProductCard from "@/components/ProductCard";
import {CardListProps, Product} from "@/types/product";
import {useAuth} from "@/context/AuthContext";
import {addFavourite, getFavourites, removeFavourite} from "@/db/favourites";

const CardList = ({category_id}: CardListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {user} = useAuth();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getProductsByCategoryId(category_id);
                setProducts((data ?? []) as Product[]);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Failed to load products");
            } finally {
                setLoading(false)
            }
        };
        loadProducts();
    }, [category_id]);

    useEffect(() => {
        const loadFavourites = async () => {
            if (!user?.id) {
                setFavouriteIds([]);
                return;
            }

            try {
                const favourites = await getFavourites(user.id);
                setFavouriteIds((favourites ?? []).map((item) => item.product_id));
            } catch (e) {
                setError(e instanceof Error ? e.message : "Failed to load favourites");
            }
        };

        loadFavourites();
    }, [user?.id]);

    const handleToggleFavourite = async (productId: number) => {
        if (!user?.id) {
            Alert.alert("Sign in required", "Please sign in to manage favourites");
            return;
        }

        const wasFavourite = favouriteIds.includes(productId);
        setFavouriteIds((prev) => wasFavourite ? prev.filter((id) => id !== productId) : [...prev, productId]);

        try {
            if (wasFavourite) {
                await removeFavourite(user.id, productId);
            } else {
                await addFavourite(user.id, productId);
            }
        } catch (e) {
            // Roll back optimistic UI update if request fails.
            setFavouriteIds((prev) => wasFavourite ? [...prev, productId] : prev.filter((id) => id !== productId));
            Alert.alert("Favourite error", e instanceof Error ? e.message : "Failed to update favourites");
        }
    };

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
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    rating={item.rating}
                    price={item.price}
                    isFavourite={favouriteIds.includes(item.id)}
                    onAddToFavouritesPress={() => handleToggleFavourite(item.id)}
                />
            )}
        />
    )
};

export default CardList;