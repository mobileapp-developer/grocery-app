import {StyleSheet, TextInput, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

export function InputRow({
                             iconName,
                             value,
                             onChangeText,
                             placeholder,
                             keyboardType,
                             theme,
                             style,
                         }: {
    iconName: "person" | "calendar-month" | "phone";
    value: string;
    onChangeText: (value: string) => void;
    placeholder: string;
    keyboardType?: "default" | "phone-pad";
    theme: {
        inputBg: string;
        inputBorder: string;
        text: string;
        muted: string;
        accent: string;
    };
    style?: object;
}) {
    return (
        <View style={[styles.inputRow, {backgroundColor: theme.inputBg, borderColor: theme.inputBorder}, style]}>
            <MaterialIcons name={iconName} size={18} color={theme.accent}/>
            <TextInput
                style={[styles.inputText, {color: theme.text}]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={theme.muted}
                keyboardType={keyboardType ?? "default"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputRow: {
        minHeight: 48,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    inputText: {
        flex: 1,
        fontSize: 18,
    },
})