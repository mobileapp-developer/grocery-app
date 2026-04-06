import {Stack} from "expo-router";
import {useColorScheme} from "react-native";

export default function HomeLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerTitle: "Home",
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: colorScheme === 'dark' ? 'dark' : 'light',
            }}
        />
    );
}
