import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  TouchableOpacityProps,
  View,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import baseTheme from '../../theme';
import { useTheme } from '../../theme/ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'accent';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  ...rest
}) => {
  const { theme: currentTheme } = useTheme();

  // dynamic colors based on theme
  const variantBackground =
    variant === 'primary'
      ? currentTheme.colors.primary.secondary
      : variant === 'accent'
      ? currentTheme.colors.primary.accent
      : 'transparent';

  const variantBorderColor =
    variant === 'secondary' ? currentTheme.colors.primary.main : undefined;

  const variantTextColor =
    variant === 'primary'
      ? currentTheme.colors.neutral.white
      : variant === 'secondary'
      ? currentTheme.colors.primary.main
      : currentTheme.colors.neutral.black;

  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={[buttonStyles, { backgroundColor: variantBackground, borderColor: variantBorderColor }]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
    >
      <View style={styles.contentContainer}>
        {leftIcon && !loading && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        {loading ? (
          <ActivityIndicator 
            color={variant === 'secondary' ? currentTheme.colors.primary.main : currentTheme.colors.neutral.white} 
            size="small" 
          />
        ) : (
          <Text style={[textStyles, { color: variantTextColor }]}>{title}</Text>
        )}
        
        {rightIcon && !loading && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: baseTheme.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: baseTheme.colors.primary.secondary, // Verde Turquesa
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: baseTheme.colors.primary.main, // Azul Marinho
  },
  accent: {
    backgroundColor: baseTheme.colors.primary.accent, // Amarelo
  },
  small: {
    paddingVertical: baseTheme.spacing.xxs,
    paddingHorizontal: baseTheme.spacing.s,
    minHeight: 32,
  },
  medium: {
    paddingVertical: baseTheme.spacing.xs,
    paddingHorizontal: baseTheme.spacing.m,
    minHeight: 40,
  },
  large: {
    paddingVertical: baseTheme.spacing.s,
    paddingHorizontal: baseTheme.spacing.l,
    minHeight: 48,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: '600',
  },
  primaryText: {
    color: baseTheme.colors.neutral.white,
  },
  secondaryText: {
    color: baseTheme.colors.primary.main,
  },
  accentText: {
    color: baseTheme.colors.neutral.black,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  disabledText: {
    opacity: 0.7,
  },
  leftIcon: {
    marginRight: baseTheme.spacing.xs,
  },
  rightIcon: {
    marginLeft: baseTheme.spacing.xs,
  },
});

export default Button;