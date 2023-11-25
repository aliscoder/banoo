import React from "react";
import { Linking } from "react-native";
import { TextNormal } from "../Text/Text";
import { Pressable } from "native-base";

type Props = {};

function LocationActivator({}: Props) {
  return (
    <Pressable onPress={() => Linking.openSettings()}>
      <TextNormal color="warning">فعالسازی مکانیابی</TextNormal>
    </Pressable>
  );
}

export default LocationActivator;
