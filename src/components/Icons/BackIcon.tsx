import { SimpleLineIcons } from "@expo/vector-icons";
import { BarberStackNavigationProp } from "@navigation/types/barberTypes";
import { useNavigation } from "@react-navigation/core";
import { Icon } from "native-base";
import React from "react";

const BackIcon = () => {
  const { goBack } = useNavigation<BarberStackNavigationProp>();

  return (
    <Icon as={SimpleLineIcons} onPress={goBack} name="arrow-left" color="text.main" size="md" />
  );
};

export default BackIcon;
