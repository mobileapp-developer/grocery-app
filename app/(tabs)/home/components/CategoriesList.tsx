import {ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
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

    const colorScheme = useColorScheme();

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
                <View style={styles.item}>
                    <Pressable
                        style={[styles.container, {backgroundColor: colorScheme === "dark" ? colors.darkGrey : colors.white},]}
                        onPress={onPress}>
                        <Text style={styles.icon}>{item.icon}</Text>
                    </Pressable>

                    <Text style={[styles.text, {color: colorScheme === "dark" ? colors.white : colors.black}]}
                          numberOfLines={1}>{item.name}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        width: 88,
        alignItems: "center",
        marginRight: 12,
    },
    container: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGrey,
    },
    icon: {
        fontSize: 26,
    },
    text: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
    },
});