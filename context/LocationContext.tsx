import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_STORAGE_KEY = 'location:v1';

type Coords = {
    latitude: number;
    longitude: number;
};

type LocationContextValue = {
    address: string;
    coords: Coords | null;
    setLocation: (coords: Coords, address: string) => void;
};

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export function LocationProvider({children}: { children: ReactNode }) {
    const [address, setAddress] = useState('Your Address...');
    const [coords, setCoords] = useState<Coords | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
                if (!raw) return;

                const parsed = JSON.parse(raw) as { address: string; coords: Coords | null };
                if (parsed?.coords) {
                    setCoords(parsed.coords);
                    setAddress(parsed.address);
                }
            } catch (error) {
                console.error(error);
            }
        };
        void load();
    }, []);

    const value = useMemo(
        () => ({
            address,
            coords,
            setLocation: (nextCoords: Coords, nextAddress: string) => {
                setCoords(nextCoords);
                setAddress(nextAddress);

                void AsyncStorage.setItem(
                    LOCATION_STORAGE_KEY,
                    JSON.stringify({
                        address: nextAddress,
                        coords: nextCoords,
                    }),
                );
            },
        }),
        [address, coords]
    );

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocation() {
    const context = useContext(LocationContext);

    if (!context) throw new Error("useLocation must be used within a LocationProvider");

    return context;
}