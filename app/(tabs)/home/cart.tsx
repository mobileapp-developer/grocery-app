import {useMemo} from "react";
import {FlatList, Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {colors} from "@/constants/colors";
import {useCart} from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useRouter} from "expo-router";

export default function Cart() {
    const {items, updateQuantity, removeFromCart} = useCart();
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const isDark = colorScheme === 'dark';

    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }, [items]);

    return (
        <View style={[styles.container, {backgroundColor: isDark ? colors.black : colors.white}]}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.key}
                contentContainerStyle={[styles.listContent, {paddingTop: insets.top + 56}]}
                style={styles.list}
                renderItem={({item}) => (
                    <CartItem
                        title={item.product.title}
                        price={parseFloat((item.product.price * item.quantity).toFixed(2))}
                        quantity={item.quantity}
                        image={item.product.image}
                        onIncrease={() => updateQuantity(item.product, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.product, item.quantity - 1)}
                        onRemove={() => removeFromCart(item.product)}
                    />
                )}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, {color: isDark ? colors.white : colors.black}]}>Your cart is
                        empty.</Text>
                }
            />
            <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, {color: isDark ? colors.white : colors.black}]}>
                    Total
                </Text>
                <Text style={[styles.summaryValue, {color: isDark ? colors.white : colors.black}]}>
                    ${total.toFixed(2)}
                </Text>
            </View>
            <View style={styles.separator}></View>
            <Pressable style={styles.button} onPress={() => router.push('/home/checkout')}>
                <Text style={styles.buttonText}>Go to checkout</Text>
            </Pressable>
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
    button: {
        margin: 16,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: colors.green,
        alignItems: "center",
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
    summaryRow: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    summaryLabel: {
        fontSize: 16,
        fontWeight: "600",
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: "700",
    },
    separator: {
        borderColor: colors.lightGrey,
        borderWidth: 1
    },
});

