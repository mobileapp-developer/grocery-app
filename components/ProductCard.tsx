import {Image, Pressable, StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle} from "react-native";
import {Feather, FontAwesome} from "@expo/vector-icons";
import {colors} from "@/constants/colors";

type Props = {
    image: string;
    title: string;
    rating: number;
    price: number;
    cardStyle?: StyleProp<ViewStyle>;
};

const ProductCard = ({image, title, rating, price, cardStyle}: Props) => {
    const colorScheme = useColorScheme();
    return (
        <View style={[styles.card, {backgroundColor: colorScheme === 'dark' ? colors.black : colors.white,}, cardStyle]}>
            <View style={styles.cardTop}>
                <View
                    style={[styles.imageContainer, {backgroundColor: colorScheme === 'dark' ? colors.darkGrey : colors.lightGrey}]}>
                    <Image source={{uri: image}} style={styles.image} resizeMode="contain"/>
                </View>
                <Pressable
                    style={[styles.addButton, {backgroundColor: colorScheme === 'dark' ? colors.black : colors.white,}]}>
                    <Feather name="plus" size={26} color={colorScheme === 'dark' ? 'white' : 'black'}/>
                </Pressable>
            </View>
            <View style={styles.cardBottom}>
                <Text
                    style={[styles.title, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>{title}</Text>
                <View style={styles.ratingRow}>
                    <FontAwesome name="star" size={20} color="#F5B300"/>
                    <Text
                        style={[styles.rating, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>{rating.toFixed(1)}</Text>
                </View>
                <Text
                    style={[styles.price, {color: colorScheme === 'dark' ? colors.white : colors.black}]}>${price.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 175,
        borderRadius: 14,
        padding: 18,
        marginRight: 16,
    },
    cardTop: {
        marginBottom: 16,
    },
    cardBottom: {
        gap: 8,
    },
    imageContainer: {
        height: 130,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
    },
    image: {
        width: "95%",
        height: "95%",
    },
    count: {},
    addButton: {
        position: "absolute",
        right: 0,
        bottom: -4,
        width: 38,
        height: 38,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 2},
        elevation: 2,
    },
    deleteButton: {},
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    rating: {
        fontSize: 16,
        fontWeight: "600",
    },
    price: {
        fontSize: 18,
        fontWeight: "700",
    },
});

export default ProductCard;