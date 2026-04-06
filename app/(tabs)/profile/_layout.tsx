import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerTitle: "Profile",
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'light',
            }}
        />
    );
}
