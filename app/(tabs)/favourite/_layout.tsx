import { Stack } from "expo-router";

export default function FavouriteLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: "Favourite",
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'light',
            }}
        />
    );
}
