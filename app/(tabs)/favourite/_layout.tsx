import {Stack} from "expo-router";
import {useColorScheme} from "react-native";

export default function FavouriteLayout() {
    const colorScheme = useColorScheme();
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: colorScheme === 'dark' ? 'systemChromeMaterial' : 'light',
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Favourite",
                }}
            />
        </Stack>
    );
}
