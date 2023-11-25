import { useTheme } from "native-base";

const TopTabOptions = () => {
  const theme = useTheme();
  return {
    tabBarStyle: {
      backgroundColor: theme.colors.primary,
      shadowColor: "transparent",
      paddingVertical: 8,
    },
    tabBarActiveTintColor: theme.colors.secondary,
    tabBarIndicatorStyle: {
      backgroundColor: theme.colors.secondary,
      height: 3,
    },
    tabBarInactiveTintColor: theme.colors.text.muted,
    tabBarLabelStyle: {
      fontSize: 13,
      fontFamily: "Yekan",
    },
  };
};

export default TopTabOptions;
