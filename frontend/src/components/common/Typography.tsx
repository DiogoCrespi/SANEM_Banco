import React from 'react';
import { Text, TextProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import baseTheme from '../../theme';
import { useTheme } from '../../theme/ThemeProvider';

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'body' 
  | 'bodySecondary' 
  | 'small';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  center?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color,
  center = false,
  style,
  children,
  ...rest
}) => {
  const { theme: currentTheme } = useTheme();

  const computedColor = color ?? currentTheme.typography[variant]?.color ?? currentTheme.colors.neutral.black;

  const textStyles = [
    styles[variant],
    { color: computedColor },
    center && styles.center,
    style,
  ];

  return (
    <Text style={textStyles} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: baseTheme.typography.h1.fontSize,
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: baseTheme.typography.h1.fontWeight,
    lineHeight: baseTheme.typography.h1.lineHeight,
  },
  h2: {
    fontSize: baseTheme.typography.h2.fontSize,
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: baseTheme.typography.h2.fontWeight,
    lineHeight: baseTheme.typography.h2.lineHeight,
  },
  h3: {
    fontSize: baseTheme.typography.h3.fontSize,
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: baseTheme.typography.h3.fontWeight,
    lineHeight: baseTheme.typography.h3.lineHeight,
  },
  h4: {
    fontSize: baseTheme.typography.h4.fontSize,
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: baseTheme.typography.h4.fontWeight,
    lineHeight: baseTheme.typography.h4.lineHeight,
  },
  body: {
    fontSize: baseTheme.typography.body.fontSize,
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: baseTheme.typography.body.fontWeight,
    lineHeight: baseTheme.typography.body.lineHeight,
  },
  bodySecondary: {
    fontSize: baseTheme.typography.bodySecondary.fontSize,
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: baseTheme.typography.bodySecondary.fontWeight,
    lineHeight: baseTheme.typography.bodySecondary.lineHeight,
  },
  small: {
    fontSize: baseTheme.typography.small.fontSize,
    fontFamily: baseTheme.fontFamily.primary,
    fontWeight: baseTheme.typography.small.fontWeight,
    lineHeight: baseTheme.typography.small.lineHeight,
  },
  center: {
    textAlign: 'center',
  },
});

export default Typography;