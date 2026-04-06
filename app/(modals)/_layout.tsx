import { Stack } from "expo-router";

const ModalLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                presentation: 'modal',
            }}
        />
    )
}

export default ModalLayout;
