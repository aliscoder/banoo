import { NavigatorScreenParams, RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ShopSection = {
  Entry: undefined;
  Location: undefined;
  Schedule: undefined;
  Service: undefined;
  About: undefined;
  Reward: undefined;
  Referral: undefined;
  Protect: undefined;
  CoWorker: undefined;
};

export type ProfileSection = {
  Info: undefined;
  Review: undefined;
  Services: undefined;
};

export type BarberBottomTabParamList = {
  Home: undefined;
  Profile: NavigatorScreenParams<ProfileSection>;
  Calendar: undefined;
  Clients: undefined;
};

export type BarberStackParamList = {
  Main: NavigatorScreenParams<BarberBottomTabParamList>;
  Notification: undefined;
  ChangePass: undefined;
  Shop: NavigatorScreenParams<ShopSection>;
  EditInfo: undefined;
  Reservation: undefined;
  BlockTime: undefined;
  InviteContact: undefined;
  Broadcast: undefined;
  AddClient: undefined;
  Requests: undefined;
  Appointment: {
    appointmentId: string;
  };
};

// barber screen props
export type BarberStackNavigationProp = NativeStackNavigationProp<BarberStackParamList>;
export type ApptScreenParams = RouteProp<BarberStackParamList, "Appointment">;
