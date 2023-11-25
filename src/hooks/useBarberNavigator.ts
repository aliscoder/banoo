import { BarberStackNavigationProp, ShopSection } from "@navigation/types/barberTypes";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { useMemo } from "react";

const useBarberNavigator = () => {
  const { navigate, replace } = useNavigation<BarberStackNavigationProp>();

  const navigateInShop = useMemo(
    () => (extra: NavigatorScreenParams<ShopSection>) => {
      navigate("Shop", extra);
    },
    []
  );

  const navigateToAppt = useMemo(
    () => (id: string, extra?: { replace: boolean }) => {
      extra?.replace
        ? replace("Appointment", { appointmentId: id })
        : navigate("Appointment", { appointmentId: id });
    },
    []
  );
  const navigateToRequestedAppts = useMemo(() => () => navigate("Requests"), []);
  const navigateToReservation = useMemo(() => () => navigate("Reservation"), []);
  const navigateToBroadcast = useMemo(() => () => navigate("Broadcast"), []);
  const navigateToAddClient = useMemo(() => () => navigate("AddClient"), []);
  const navigateToNotification = useMemo(() => () => navigate("Notification"), []);

  return {
    navigateInShop,
    navigateToAppt,
    navigateToRequestedAppts,
    navigateToReservation,
    navigateToBroadcast,
    navigateToAddClient,
    navigateToNotification,
  };
};

export default useBarberNavigator;
