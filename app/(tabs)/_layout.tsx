import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {colors} from "@/constants/colors";
import {useColorScheme} from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            animation: "shift",
            tabBarActiveTintColor: colors.green,
            tabBarInactiveTintColor: colors.black,
            tabBarStyle: {
                backgroundColor: colorScheme === 'dark' ? colors.black : colors.white,
                borderTopColor: colorScheme === 'dark' ? colors.black : colors.white,
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} color={focused ? colors.green : colors.black}
                                  size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: "Favourite",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons name={focused ? 'heart' : 'heart-outline'}
                                  color={focused ? colors.green : colors.black} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons name={focused ? 'search' : 'search-outline'}
                                  color={focused ? colors.green : colors.black} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'}
                                  color={focused ? colors.green : colors.black} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: "Menu",
                    tabBarIcon: ({size, focused}) => (
                        <Ionicons name={focused ? 'menu' : 'menu-outline'} color={focused ? colors.green : colors.black}
                                  size={size}/>
                    ),
                }}
            />
        </Tabs>
    )
}