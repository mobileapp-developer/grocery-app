import {Stack} from "expo-router";
import {useColorScheme} from "react-native";

export default function HomeLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerLargeTitleEnabled: true,
                headerTransparent: true,
                headerBlurEffect: colorScheme === 'dark' ? 'systemChromeMaterial' : 'light',
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerTitle: 'Home',
                }}
            />
            <Stack.Screen
                name="[categoryId]"
                options={({route}) => {
                    const params = route.params as { title?: string } | undefined;

                    return {
                        headerShown: true,
                        headerTitle: params?.title ?? "All",
                    };
                }}
            />
            <Stack.Screen
                name="cart"
                options={{
                    headerShown: true,
                    headerLargeTitleEnabled: false,
                    headerTitle: "Cart",
                }}
            />
            <Stack.Screen
                name='checkout'
                options={{
                    headerShown: true,
                    headerLargeTitleEnabled: false,
                    headerTitle: 'Checkout',
                }}
            />
            <Stack.Screen
                name='payment'
                options={{
                    headerShown: false,
                    headerLargeTitleEnabled: false,
                    headerTitle: 'Payment',
                }}
            />
        </Stack>
    );
}
