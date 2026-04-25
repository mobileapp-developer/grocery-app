import {FlatList, StyleSheet, Text, useColorScheme, View} from "react-native";
import {colors} from "@/constants/colors";
import {useCart} from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function Cart() {
    const {items, updateQuantity, removeFromCart} = useCart();
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const isDark = colorScheme === 'dark';

    return (
        <View style={[styles.container, {backgroundColor: isDark ? colors.black : colors.white}]}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.product.id.toString()}
                contentContainerStyle={[styles.listContent, {paddingTop: insets.top + 56}]}
                style={styles.list}
                renderItem={({item}) => (
                    <CartItem
                        title={item.product.title}
                        price={parseFloat((item.product.price * item.quantity).toFixed(2))}
                        quantity={item.quantity}
                        image={item.product.image}
                        onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                        onRemove={() => removeFromCart(item.product.id)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, {color: isDark ? colors.white : colors.black}]}>Your cart is
                        empty.</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        width: '100%',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 24,
        fontSize: 16,
    },
});

