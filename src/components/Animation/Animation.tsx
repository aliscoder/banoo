import React from "react";
import LottieView from "lottie-react-native";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import { Center, View } from "native-base";

interface Props extends IViewProps {
  name: string;
  size?: number;
  centered?: boolean;
}

const Animation: React.FC<Props> = ({ name, size = 250, centered = false, ...rest }) => {
  return centered ? (
    <Center height="100%">
      <LottieView
        source={name}
        autoPlay
        style={{
          width: size,
          height: size,
        }}
      />
    </Center>
  ) : (
    <View {...rest}>
      <LottieView
        source={name}
        autoPlay
        style={{
          width: size,
          height: size,
        }}
      />
    </View>
  );
};

export default Animation;
