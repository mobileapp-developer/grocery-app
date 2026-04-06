import { Stack } from "expo-router";

export default function MenuLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: "Menu",
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'light',
            }}
        />
    );
}
