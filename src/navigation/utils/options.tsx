import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { Icon, useTheme } from "native-base";
import { StatusBar } from "react-native";
import { BarberBottomTabParamList } from "../types/barberTypes";

export const clientBottomTabOptions = ({ route }: { route: any }) => {
  const theme = useTheme();

  return {
    headerShown: false,

    tabBarStyle: {
      backgroundColor: theme.colors.primary,
      borderTopWidth: 0.5,
      borderTopColor: theme.colors.dash,
      shadowColor: "transparent",
      height: 60,
    },
    tabBarShowLabel: false,
    tabBarIcon: ({ focused }: { focused: boolean }) => {
      let iconName: any = "home";

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Reservation") {
        iconName = focused ? "clipboard" : "clipboard-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "Appointments") {
        iconName = focused ? "calendar" : "calendar-outline";
      }
      return (
        <Icon
          as={Ionicons}
          name={iconName}
          size={focused ? "lg" : "md"}
          color={focused ? "text.secondary" : "text.muted"}
        />
      );
    },
  };
};

export const barberBottomTabOptions = ({
  route,
}: {
  route: RouteProp<BarberBottomTabParamList, keyof BarberBottomTabParamList>;
}) => {
  const theme = useTheme();

  return {
    headerShown: false,

    tabBarStyle: {
      backgroundColor: theme.colors.primary,
      borderTopWidth: 0.5,
      borderTopColor: theme.colors.dash,
      shadowColor: "transparent",
      height: 60,
    },
    tabBarShowLabel: false,
    tabBarIcon: ({ focused }: { focused: boolean }) => {
      let iconName: any = "home";

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "Calendar") {
        iconName = focused ? "calendar" : "calendar-outline";
      } else if (route.name === "Clients") {
        iconName = focused ? "boat" : "boat-outline";
      }
      return (
        <Icon
          as={Ionicons}
          name={iconName}
          size={focused ? "lg" : "md"}
          color={focused ? "text.secondary" : "text.muted"}
        />
      );
    },
  };
};

export const appointmentHistoryScreenOptions = () => {
  const theme = useTheme();
  return {
    tabBarStyle: {
      backgroundColor: theme.colors.primary,
      shadowColor: "transparent",
      paddingTop: StatusBar.currentHeight,
    },
    tabBarActiveTintColor: theme.colors.secondary,
    tabBarIndicatorStyle: {
      backgroundColor: theme.colors.secondary,
      height: 3,
    },
    tabBarInactiveTintColor: theme.colors.text.muted,
    tabBarLabelStyle: {
      fontSize: 16,
      fontFamily: "Yekan",
    },
  };
};
