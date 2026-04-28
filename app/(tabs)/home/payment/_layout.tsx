import { Stack, useRouter } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function PaymentLayout() {
    const router = useRouter();
    const isDark = useColorScheme() === "dark";

    return (
        <Stack
            screenOptions={{
                headerTitle: "Payment",
                headerTransparent: true,
                headerLargeTitleEnabled: false,
                headerBlurEffect: isDark ? "systemChromeMaterial" : "light",
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <Pressable onPress={() => router.back()} style={{ marginRight: 12 }}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color={isDark ? colors.white : colors.textLight}
                            />
                        </Pressable>
                    ),
                }}
            />
        </Stack>
    );
}
