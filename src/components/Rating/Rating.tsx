import React, { useState } from "react";
import { HStack, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { ColorType } from "native-base/lib/typescript/components/types";

interface Props {
  rating?: number;
  large?: boolean;
  onRate?: (value: number) => void;
  scheme?: ColorType;
}

const Rating: React.FC<Props> = ({ rating = 0, large = false, onRate, scheme = "secondary" }) => {
  const handleName = (item: number) => {
    return rating >= item ? "star" : "star-o";
  };
  return (
    <HStack alignItems="center" space={2}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Icon
          onPress={() => (onRate ? onRate(item) : null)}
          key={index}
          as={FontAwesome}
          name={handleName(item)}
          size={large ? "xl" : "sm"}
          color={scheme}
        />
      ))}
    </HStack>
  );
};

export default Rating;
