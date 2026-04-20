import {CartItem, Product} from "@/types/product";
import {createContext, ReactNode, useCallback, useContext, useMemo, useState} from "react";

type CartContextValue = {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

type CartProviderProps = {
    children: ReactNode
}

export function CartProvider({children}: CartProviderProps) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((product: Product) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id)

            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            }

            return [...prev, {product, quantity: 1}]
        })
    }, [])

    const removeFromCart = useCallback((product: number) => {
        setItems((prev) => prev.filter((item) => item.product.id !== product))
    }, [])

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setItems((prev) =>
            prev.map((item) =>
                item.product.id === productId ? {...item, quantity} : item
            )
        )
    }, [removeFromCart])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const value = useMemo(
        () => ({
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
        }),
        [items, addToCart, removeFromCart, updateQuantity, clearCart]
    )

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return context
}