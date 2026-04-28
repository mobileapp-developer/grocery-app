import {useColorScheme} from 'react-native';
import {colors} from './colors';

export type Theme = {
    screen: string;
    card: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    inputBg?: string;
    inputBorder?: string;
    danger?: string;
};

export const getTheme = (isDark: boolean): Theme => ({
    screen:      isDark ? colors.black : colors.screenLight,
    card:        isDark ? colors.darkGrey : colors.white,
    text:        isDark ? colors.white : colors.textLight,
    muted:       isDark ? colors.mutedDark : colors.mutedLight,
    border:      isDark ? colors.inputBorderDark : colors.inputBorderLight,
    inputBg:     isDark ? colors.inputBgDark : colors.inputBgLight,
    inputBorder: isDark ? colors.inputBorderDark : colors.inputBorderLight,
    accent:      colors.accent,
    danger:      colors.danger,
});

export const useTheme = () => {
    const scheme = useColorScheme();
    return getTheme(scheme === 'dark');
};

