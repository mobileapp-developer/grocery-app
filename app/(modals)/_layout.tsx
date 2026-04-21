import {router, Stack} from "expo-router";
import {HeaderBackButton} from "@react-navigation/elements";
import {useColorScheme} from "react-native";

const ModalLayout = () => {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                presentation: 'modal',
                headerBlurEffect: colorScheme === 'dark' ? 'systemThickMaterialDark' : 'light',
            }}
        >
            <Stack.Screen
                name="location-picker"
                options={{
                    headerShown: true,
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerTitle: 'Location',
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            label="Back"
                            onPress={() => router.back()}
                            style={{right: 10}}
                        />
                    ),
                }}
            />
        </Stack>
    )
}

export default ModalLayout;
