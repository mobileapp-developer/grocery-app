import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {useRouter} from "expo-router";
import {colors} from "@/constants/colors";
import CardList from "@/components/CardList";

type Props = {
    title: string;
    category_id: number;
}

const CategorySection = ({title, category_id}: Props) => {
    const router = useRouter();
    const colorScheme = useColorScheme();

    return (
        <>
            <View style={styles.section}>
                <Text
                    style={[styles.sectionTitle, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>{title}</Text>
                <Pressable
                    onPress={() => router.push({
                        pathname: "/(tabs)/home/[categoryId]",
                        params: {
                            categoryId: category_id.toString(),
                            title,
                        },
                    })}
                >
                    <Text style={styles.viewAll}>View all</Text>
                </Pressable>

            </View>
            <View>
                <CardList category_id={category_id}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 16,
        paddingTop: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    viewAll: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.green,
        paddingRight: 16,
    },
});

export default CategorySection;