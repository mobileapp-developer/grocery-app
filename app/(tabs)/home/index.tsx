import {ScrollView, StyleSheet, Text, useColorScheme, View} from "react-native";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {BannerList} from "@/app/(tabs)/home/components/BannerList";
import {colors} from "@/constants/colors";

export default function Home() {
    const colorScheme = useColorScheme();

    return (
        <ScrollView style={[styles.container, {backgroundColor: colorScheme === 'dark' ? colors.black : colors.white}]}>

            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.addressContainer}>
                    <MaterialIcons name="delivery-dining" size={28} color={colorScheme === 'dark' ? colors.white : colors.black} />
                    <Text style={[styles.address, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>Your Address...</Text>
                    <Entypo name="chevron-small-down" size={24} color={colorScheme === 'dark' ? colors.white : colors.black} />
                </View>
                <View style={styles.bagIcon}>
                    <Ionicons name="bag-outline" size={24} color={colorScheme === 'dark' ? colors.white : colors.black} />
                </View>
            </View>

            {/* MAIN CONTENT*/}
            <ScrollView contentContainerStyle={styles.content}>
                <BannerList/>
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 160,
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
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
    },
    bagIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});