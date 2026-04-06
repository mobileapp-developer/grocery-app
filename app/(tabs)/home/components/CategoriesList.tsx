import {ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text} from "react-native";
import {useEffect, useState} from "react";
import {getCategories} from "@/db/categories";
import {colors} from "@/constants/colors";

type Category = {
    id: number;
    name: string;
    icon: string;
};

export const CategoriesList = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const onPress = () => Alert.alert("Alert", "Coming soon!");

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories((data ?? []) as Category[]);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Failed to load categories");
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);

    if (loading) return <ActivityIndicator/>
    if (error) return <Text>{error}</Text>

    return (
        <FlatList
            data={categories}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            contentContainerStyle={{paddingHorizontal: 16}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <Pressable style={styles.container} onPress={onPress}>
                    <Text style={styles.icon}>{item.icon}</Text>
                    <Text style={styles.text}>{item.name}</Text>
                </Pressable>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 75,
        paddingHorizontal: 18,
        borderRadius: 38,
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    icon: {
        fontSize: 18,
    },
    text: {
        color: colors.black,
        fontSize: 14,
        fontWeight: '400',
    },
});
