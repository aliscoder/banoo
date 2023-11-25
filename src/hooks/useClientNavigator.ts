import { ClientScreenNavigationProp } from "@navigation/types/clientTypes";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";

const useClientNavigator = () => {
  const { navigate, replace } = useNavigation<ClientScreenNavigationProp>();

  //   const navigateInShop = useMemo(
  //     () => (extra: NavigatorScreenParams<ShopSection>) => {
  //       navigate("Shop", extra);
  //     },
  //     []
  //   );

  const navigateToAppt = useMemo(
    () => (id: string, extra?: { replace: boolean }) => {
      extra?.replace
        ? replace("Appointment", { appointmentId: id })
        : navigate("Appointment", { appointmentId: id });
    },
    []
  );
  //   const navigateToRequestedAppts = useMemo(() => () => navigate("Requests"), []);
  //   const navigateToReservation = useMemo(() => () => navigate("Reservation"), []);
  //   const navigateToBroadcast = useMemo(() => () => navigate("Broadcast"), []);
  //   const navigateToAddClient = useMemo(() => () => navigate("AddClient"), []);

  return {
    navigateToAppt,
  };
};

export default useClientNavigator;
