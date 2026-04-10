import {ActivityIndicator, ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import BannerList from "@/app/(tabs)/home/components/BannerList";
import {colors} from "@/constants/colors";
import CategoriesList from "@/app/(tabs)/home/components/CategoriesList";
import CategorySection from "@/app/(tabs)/home/components/CategorySection";
import {useCategory} from "@/hooks/useCategory";

export default function Home() {
    const colorScheme = useColorScheme();

    const {categories, loading, error} = useCategory();

    if (loading) return <ActivityIndicator/>
    if (error) return <Text>{error}</Text>

    return (
        <ScrollView
            style={{backgroundColor: colorScheme === 'dark' ? colors.black : colors.white}}
            contentInsetAdjustmentBehavior='automatic'
            showsVerticalScrollIndicator={false}
        >

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.addressContainer}>
                    <MaterialIcons name="delivery-dining" size={28}
                                   color={colorScheme === 'dark' ? colors.white : colors.black}/>
                    <Text style={[styles.address, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>Your
                        Address...</Text>
                    <Entypo name='chevron-small-down' size={24}
                            color={colorScheme === 'dark' ? colors.white : colors.black}/>
                </View>
                <View style={styles.bagIcon}>
                    <Ionicons name="bag-outline" size={24}
                              color={colorScheme === 'dark' ? colors.white : colors.black}/>
                </View>
            </View>

            {/* MAIN CONTENT*/}
            <View style={styles.content}>
                <View style={styles.banner}>
                    <BannerList/>
                </View>
                <View style={styles.categories}>
                    <CategoriesList/>
                </View>

                {categories.map((category) => (
                    <CategorySection
                        key={category.id}
                        title={category.name}
                        category_id={category.id}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    address: {
        fontSize: 18,
        paddingHorizontal: 8,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        paddingTop: 8,
    },
    bagIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        marginTop: 8,
        marginBottom: 12,
    },
    categories: {
        marginTop: 8,
        marginBottom: 12,
    },
    products: {
        marginTop: 8,
        marginBottom: 12,
    },
});