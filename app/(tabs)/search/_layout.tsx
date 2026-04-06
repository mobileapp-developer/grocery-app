import { Stack } from "expo-router";

export default function SearchLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: "Search",
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'light',
            }}
        />
    );
}
