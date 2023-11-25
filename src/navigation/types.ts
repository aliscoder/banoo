import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ServiceType } from "../types";

export type GuestStackParamList = {
  Phone: undefined;
  Register: {
    phone: string;
  };
  Login: {
    phone: string;
    type: "client" | "barber";
  };
};

export type GuestScreenNavigationProp = NativeStackNavigationProp<GuestStackParamList>;
export type RegisterScreenRouteProp = RouteProp<GuestStackParamList, "Register">;
export type LoginScreenRouteProp = RouteProp<GuestStackParamList, "Login">;

export type ClientBottomTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Reservation: undefined;
  Profile: undefined;
};

export type ClientStackParamList = {
  Main: ClientBottomTabParamList;
  BarberProfile: {
    id: string;
  };
  EditAccount: undefined;
  Photo: undefined;
  Notification: undefined;
  Appointment: {
    appointmentId: string;
  };
  Reservation: {
    barberId: string;
    service?: ServiceType;
  };
  SlideShow: undefined;
  Review: undefined;
};

export type ClientScreenNavigationProp = NativeStackNavigationProp<ClientStackParamList>;
export type ClientBottomTabNavigationProp = NativeStackNavigationProp<ClientBottomTabParamList>;
export type ClientScreenRouteProp = RouteProp<ClientStackParamList, "Reservation">;
export type AppointmentRouteProp = RouteProp<ClientStackParamList, "Appointment">;
export type ProfileRouteProp = RouteProp<ClientStackParamList, "BarberProfile">;
export type ClientBottomTabRouteProp = RouteProp<ClientBottomTabParamList>;
