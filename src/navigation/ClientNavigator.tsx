import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentProvider from "@screens/Appointment/AppointmentProvider";
import Notification from "@screens/Notification/Notification";
import { Box } from "native-base";
import { Dimensions } from "react-native";
import { usePlatform } from "../hooks";
import {
  EditAccountScreen,
  PastAppScreen,
  ReservationScreen,
  UpcomingAppScreen,
} from "../screens/Client";
import BarberProfile from "../screens/Client/BarberProfile";
import { ClientBottomTabParamList, ClientStackParamList } from "./types";
import { appointmentHistoryScreenOptions, clientBottomTabOptions } from "./utils/options";

const ClientStack = createNativeStackNavigator<ClientStackParamList>();
const BottomTab = createBottomTabNavigator<ClientBottomTabParamList>();
const AppTopTab = createMaterialTopTabNavigator();

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home" screenOptions={clientBottomTabOptions}>
      <BottomTab.Screen name="Home" component={BarberProfile} />
      <BottomTab.Screen name="Appointments" component={AppointmentHistoryStack} />
      <BottomTab.Screen name="Reservation" component={ReservationScreen} />
      <BottomTab.Screen name="Profile" component={EditAccountScreen} />
    </BottomTab.Navigator>
  );
};

const AppointmentHistoryStack = () => {
  const { isIOS } = usePlatform();
  return (
    <Box flex={1} safeAreaTop={!isIOS && 0}>
      <AppTopTab.Navigator
        initialLayout={{ width: Dimensions.get("window").width }}
        initialRouteName="Upcoming"
        screenOptions={appointmentHistoryScreenOptions}
      >
        <AppTopTab.Screen
          name="Upcoming"
          options={{ title: "قرارهای پیش رو" }}
          component={UpcomingAppScreen}
        />
        <AppTopTab.Screen
          options={{ title: "قرار های قبلی" }}
          name="Past"
          component={PastAppScreen}
        />
      </AppTopTab.Navigator>
    </Box>
  );
};

const ClientNavigator = () => {
  return (
    <ClientStack.Navigator screenOptions={{ headerShown: false }}>
      <ClientStack.Screen name="Main" component={BottomTabStack} />
      <ClientStack.Screen name="BarberProfile" component={BarberProfile} />
      <ClientStack.Screen name="EditAccount" component={EditAccountScreen} />
      <ClientStack.Screen name="Notification" component={Notification} />
      <ClientStack.Screen name="Appointment" component={AppointmentProvider} />
      <ClientStack.Screen name="Reservation" component={ReservationScreen} />
    </ClientStack.Navigator>
  );
};

export default ClientNavigator;
