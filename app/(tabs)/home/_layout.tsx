import {Stack} from "expo-router";
import {useColorScheme} from "react-native";

export default function HomeLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: colorScheme === 'dark' ? 'dark' : 'light',
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
        </Stack>
    );
}
