import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import Typography from "./Typography";
import baseTheme from "../../theme";
import { useTheme } from "../../theme/ThemeProvider";

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  rightHeaderContent?: React.ReactNode;
  footer?: React.ReactNode;
  elevation?: "none" | "small" | "medium" | "large";
  fullWidth?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  style,
  contentStyle,
  headerStyle,
  rightHeaderContent,
  footer,
  elevation = "small",
  fullWidth = false,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  type ElevationStyleKey =
    | "elevationNone"
    | "elevationSmall"
    | "elevationMedium"
    | "elevationLarge";
  const elevationKey = `elevation${
    elevation.charAt(0).toUpperCase() + elevation.slice(1)
  }` as ElevationStyleKey;

  const cardStyles = [
    styles.card,
    styles[elevationKey],
    fullWidth && styles.fullWidth,
    style,
  ];

  const { theme: currentTheme } = useTheme();
  const dynamicCardColors = {
    backgroundColor: currentTheme.colors.neutral.white,
    borderColor: currentTheme.colors.neutral.mediumGray,
  } as any;
  const headerBorderColor = currentTheme.colors.neutral.mediumGray;
  const footerBorderColor = currentTheme.colors.neutral.mediumGray;

  return (
    <Container
      style={[cardStyles, dynamicCardColors]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {/* dynamic theme-aware colors applied via Typography and wrapper styles */}
      {(title || subtitle || rightHeaderContent) && (
        <View style={[styles.header, headerStyle, { borderBottomColor: headerBorderColor }]}>
          <View style={styles.headerTextContainer}>
            {title && (
              <Typography variant="h4" style={styles.title}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="bodySecondary" style={styles.subtitle}>
                {subtitle}
              </Typography>
            )}
          </View>
          {rightHeaderContent && (
            <View style={styles.rightHeaderContent}>{rightHeaderContent}</View>
          )}
        </View>
      )}

      <View style={[styles.content, contentStyle]}>{children}</View>

      {footer && <View style={[styles.footer, { borderTopColor: footerBorderColor }]}>{footer}</View>}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: baseTheme.colors.neutral.white,
    borderRadius: baseTheme.borderRadius.medium,
    borderWidth: 1,
    borderColor: baseTheme.colors.neutral.mediumGray,
    overflow: "hidden",
  },
  elevationNone: {
    // Sem sombra
  },
  elevationSmall: {
    ...baseTheme.shadows.small,
  },
  elevationMedium: {
    ...baseTheme.shadows.medium,
  },
  elevationLarge: {
    ...baseTheme.shadows.large,
  },
  fullWidth: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: baseTheme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: baseTheme.colors.neutral.mediumGray,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  subtitle: {
    marginTop: 2,
  },
  rightHeaderContent: {
    marginLeft: baseTheme.spacing.xs,
  },
  content: {
    padding: baseTheme.spacing.s,
  },
  footer: {
    padding: baseTheme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: baseTheme.colors.neutral.mediumGray,
  },
});

export default Card;
