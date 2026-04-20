import {Image, Pressable, StyleProp, StyleSheet, Text, useColorScheme, View, ViewStyle} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {colors} from "@/constants/colors";
import {Product} from "@/types/product";
import {AddToCartButton} from "@/components/AddToCartButton";

type Props = {
    id: number;
    image: string;
    title: string;
    rating: number;
    price: number;
    cardStyle?: StyleProp<ViewStyle>;
    onAddToFavouritesPress?: () => void;
    isFavourite?: boolean;
};

const ProductCard = ({id, image, title, rating, price, cardStyle, onAddToFavouritesPress, isFavourite = false}: Props) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const product: Product = {id, image, title, rating, price};

    return (
        <View style={[styles.card, {backgroundColor: isDark ? colors.black : colors.white}, cardStyle]}>
            <View style={styles.cardTop}>
                <View style={[styles.imageContainer, {backgroundColor: isDark ? colors.darkGrey : colors.lightGrey}]}>
                    <Image source={{uri: image}} style={styles.image} resizeMode="contain"/>
                </View>
                <Pressable onPress={onAddToFavouritesPress}
                           style={[styles.favouriteButton, {backgroundColor: isDark ? colors.black : colors.white}]}>
                    <FontAwesome name={isFavourite ? "heart" : "heart-o"} size={20}
                                 color={isFavourite ? colors.favouriteActive : (isDark ? colors.white : colors.black)}/>
                </Pressable>

                <AddToCartButton product={product}/>
            </View>
            <View style={styles.cardBottom}>
                <Text style={[styles.title, {color: isDark ? colors.white : colors.black}]}>{title}</Text>
                <View style={styles.ratingRow}>
                    <FontAwesome name="star" size={20} color="#F5B300"/>
                    <Text
                        style={[styles.rating, {color: isDark ? colors.white : colors.black}]}>{rating.toFixed(1)}</Text>
                </View>
                <Text style={[styles.price, {color: isDark ? colors.white : colors.black}]}>${price.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 175,
        borderRadius: 14,
        padding: 18,
        marginRight: 16
    },
    cardTop: {
        marginBottom: 16
    },
    cardBottom: {
        gap: 8
    },
    imageContainer: {height: 130, alignItems: "center", justifyContent: "center", borderRadius: 14},
    image: {width: "95%", height: "95%"},
    favouriteButton: {
        position: "absolute",
        right: 0,
        top: -4,
        width: 38,
        height: 38,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 2},
        elevation: 2
    },
    title: {
        fontSize: 18,
        fontWeight: "700"
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    rating: {
        fontSize: 16,
        fontWeight: "600"
    },
    price: {
        fontSize: 18,
        fontWeight: "700"
    },
});

export default ProductCard;