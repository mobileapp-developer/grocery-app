import {Alert, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {BannerList} from "@/app/(tabs)/home/components/BannerList";
import {colors} from "@/constants/colors";
import {CategoriesList} from "@/app/(tabs)/home/components/CategoriesList";

export default function Home() {
    const colorScheme = useColorScheme();

    const onPress = () => Alert.alert("Alert", "Coming soon!");

    return (
        <ScrollView
            style={[styles.container, {backgroundColor: colorScheme === 'dark' ? colors.black : colors.white}]}
            contentInsetAdjustmentBehavior="automatic"
            showsVerticalScrollIndicator={false}
        >

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.addressContainer}>
                    <MaterialIcons name="delivery-dining" size={28}
                                   color={colorScheme === 'dark' ? colors.white : colors.black}/>
                    <Text style={[styles.address, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>Your
                        Address...</Text>
                    <Entypo name="chevron-small-down" size={24}
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
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>Fruits</Text>
                    <Pressable onPress={onPress}>
                        <Text style={styles.viewAll}>View all</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
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