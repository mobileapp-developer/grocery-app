import {Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    subtitle?: string;
    color: string;
    borderColor?: string;
    onPress?: () => void;
}

export const Row = ({icon, label, subtitle, color, borderColor, onPress}: Props) => {
    return (
        <Pressable onPress={onPress}
            style={[styles.row, borderColor ? {borderBottomColor: borderColor, borderBottomWidth: 1} : null]}>
            <View style={styles.rowLeft}>
                <Ionicons name={icon} size={20} color={color}/>
                <View style={styles.rowTextWrap}>
                    <Text style={[styles.rowLabel, {color}]}>{label}</Text>
                    {!!subtitle && (
                        <Text style={[styles.rowSubtitle, {color}]} numberOfLines={1}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={color}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        minHeight: 56,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 10,
        paddingRight: 10,
    },
    rowTextWrap: {
        flex: 1,
    },
    rowLabel: {
        fontSize: 18,
        fontWeight: '400',
    },
    rowSubtitle: {
        fontSize: 16,
        opacity: 0.75,
        marginTop: 2,
    },
});