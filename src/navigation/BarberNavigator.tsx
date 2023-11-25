import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppointmentProvider from "@screens/Appointment/AppointmentProvider";
import Calendar from "@screens/Barber/Calendar/Calendar";
import Requested from "@screens/Barber/Calendar/Requested/Requested";
import Reservation from "@screens/Barber/Calendar/Reservation/Reservation";
import ChangePass from "@screens/Barber/ChangePass";
import AddClient from "@screens/Barber/Clients/AddClient";
import Broadcast from "@screens/Barber/Clients/Broadcast";
import Clients from "@screens/Barber/Clients/Clients";
import Home from "@screens/Barber/Home/Home";
import Profile from "@screens/Barber/Profile/Profile";
import {
  CoWorker,
  ShopAbout,
  ShopEntry,
  ShopLocation,
  ShopProtect,
  ShopReferral,
  ShopReward,
  ShopSchedule,
  ShopService,
} from "@screens/Barber/Shop";
import Notification from "@screens/Notification/Notification";
import { BarberBottomTabParamList, BarberStackParamList, ShopSection } from "./types/barberTypes";
import { barberBottomTabOptions } from "./utils/options";

const BarberStack = createNativeStackNavigator<BarberStackParamList>();
const BottomTab = createBottomTabNavigator<BarberBottomTabParamList>();
const ShopStack = createNativeStackNavigator<ShopSection>();

const Sample = () => <></>;
const ShopNavigator = () => (
  <ShopStack.Navigator screenOptions={{ headerShown: false }}>
    <ShopStack.Screen name="Entry" component={ShopEntry} />
    <ShopStack.Screen name="Location" component={ShopLocation} />
    <ShopStack.Screen name="Schedule" component={ShopSchedule} />
    <ShopStack.Screen name="Service" component={ShopService} />
    <ShopStack.Screen name="About" component={ShopAbout} />
    <ShopStack.Screen name="CoWorker" component={CoWorker} />
    <ShopStack.Screen name="Reward" component={ShopReward} />
    <ShopStack.Screen name="Referral" component={ShopReferral} />
    <ShopStack.Screen name="Protect" component={ShopProtect} />
  </ShopStack.Navigator>
);

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home" screenOptions={barberBottomTabOptions}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Profile" component={Profile} />
      <BottomTab.Screen name="Calendar" component={Calendar} />
      <BottomTab.Screen name="Clients" component={Clients} />
    </BottomTab.Navigator>
  );
};

const BarberNavigator = () => {
  return (
    <BarberStack.Navigator screenOptions={{ headerShown: false }}>
      <BarberStack.Screen name="Main" component={BottomTabStack} />
      <BarberStack.Screen name="Shop" component={ShopNavigator} />
      <BarberStack.Screen name="Notification" component={Notification} />
      <BarberStack.Screen name="ChangePass" component={ChangePass} />
      <BarberStack.Screen name="Appointment" component={AppointmentProvider} />
      <BarberStack.Screen name="Reservation" component={Reservation} />
      <BarberStack.Screen name="EditInfo" component={Sample} />
      <BarberStack.Screen name="BlockTime" component={Sample} />
      <BarberStack.Screen name="InviteContact" component={Sample} />
      <BarberStack.Screen name="Requests" component={Requested} />
      <BarberStack.Screen name="Broadcast" component={Broadcast} />
      <BarberStack.Screen name="AddClient" component={AddClient} />
    </BarberStack.Navigator>
  );
};

export default BarberNavigator;
