import {ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import BannerList from "@/app/(tabs)/home/components/BannerList";
import {colors} from "@/constants/colors";
import CategoriesList from "@/app/(tabs)/home/components/CategoriesList";
import CategorySection from "@/app/(tabs)/home/components/CategorySection";
import {useCategory} from "@/hooks/useCategory";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useLocation} from "@/context/LocationContext";
import {useRouter} from "expo-router";

export default function Home() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const androidHeaderOffset = Platform.OS === 'android' ? insets.top + 56 : 0;

    const {categories, loading, error} = useCategory();
    const {address} = useLocation();

    if (loading) return <ActivityIndicator/>
    if (error) return <Text>{error}</Text>

    return (
        <ScrollView
            style={{backgroundColor: colorScheme === 'dark' ? colors.black : colors.white}}
            contentInsetAdjustmentBehavior='automatic'
            contentContainerStyle={[styles.scrollContent, Platform.OS === 'android' && {paddingTop: androidHeaderOffset}]}
            showsVerticalScrollIndicator={false}
        >

            {/* HEADER */}
            <View style={styles.header}>
                <Pressable
                    style={styles.addressContainer}
                    onPress={() => router.push('/(modals)/location-picker')}
                >
                    <MaterialIcons name="delivery-dining" size={28}
                                   color={colorScheme === 'dark' ? colors.white : colors.black}/>
                    <Text
                        style={[styles.address, {color: colorScheme === 'dark' ? colors.white : colors.black}]}
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        {address}
                    </Text>
                    <Entypo name='chevron-small-down' size={24}
                            color={colorScheme === 'dark' ? colors.white : colors.black}/>
                </Pressable>
                <Pressable
                    style={styles.bagIcon}
                    onPress={() => router.push('/home/cart')}
                >
                    <Ionicons name="bag-outline" size={24}
                              color={colorScheme === 'dark' ? colors.white : colors.black}/>
                </Pressable>
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
    scrollContent: {
        paddingBottom: 12,
    },
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
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    address: {
        fontSize: 18,
        paddingHorizontal: 8,
        flexShrink: 1,
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