import {useEffect, useState} from "react";
import {ActivityIndicator, Button, StyleSheet, Text, View} from "react-native";
import MapView, {MapPressEvent, Marker, Region} from "react-native-maps";
import * as Location from "expo-location";
import {router} from "expo-router";
import {useLocation} from "@/context/LocationContext";

type Coords = { latitude: number; longitude: number };

const DEFAULT_REGION: Region = {
    latitude: 50.4501,
    longitude: 30.5234,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
};

export default function LocationPickerModal() {
    const {setLocation} = useLocation();
    const [region, setRegion] = useState<Region>(DEFAULT_REGION);
    const [picked, setPicked] = useState<Coords | null>(null);
    const [addressLabel, setAddressLabel] = useState("Selected location");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const resolveAddress = async (coords: Coords) => {
        try {
            const result = await Location.reverseGeocodeAsync(coords);
            const first = result[0];
            if (!first) return "Selected location";

            const parts = [first.street, first.city, first.region]
                .map((p) => p?.trim())
                .filter(Boolean) as string[];

            const uniqueParts = parts.filter(
                (part, index, arr) =>
                    index === arr.findIndex((p) => p.toLowerCase() === part.toLowerCase())
            );

            return uniqueParts.join(", ") || "Selected location";
        } catch {
            return "Selected location";
        }
    };

    useEffect(() => {
        let cancelled = false;
        const init = async () => {
            try {
                const {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    if (!cancelled) setError("Location permission denied");
                    return;
                }
                const pos = await Location.getCurrentPositionAsync({});
                const coords = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                };
                const label = await resolveAddress(coords);
                if (cancelled) return;
                setPicked(coords);
                setRegion((prev) => ({...prev, ...coords}));
                setAddressLabel(label);
            } catch {
                if (!cancelled) setError("Unable to determine current location");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void init();
        return () => {
            cancelled = true;
        };
    }, []);

    const onMapPress = async (e: MapPressEvent) => {
        const coords = e.nativeEvent.coordinate;
        setPicked(coords);
        setAddressLabel(await resolveAddress(coords));
    };

    const onConfirm = () => {
        if (!picked) return;
        setLocation(picked, addressLabel);
        router.back();
    };

    if (loading) return <ActivityIndicator style={{flex: 1}}/>;
    if (error) return <View style={styles.center}><Text>{error}</Text></View>;

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={region} onPress={onMapPress}>
                {picked && <Marker coordinate={picked} draggable onDragEnd={onMapPress as any}/>}
            </MapView>

            <View style={styles.footer}>
                <Text numberOfLines={2}>{addressLabel}</Text>
                <Button title="Use this location" onPress={onConfirm}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    footer: {
        padding: 16,
        gap: 10,
        backgroundColor: "white"
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
});
