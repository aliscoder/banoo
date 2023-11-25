import { SimpleLineIcons } from "@expo/vector-icons";
import { Icon, Pressable, Text } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import React from "react";
import { RowAround } from "../Row/Row";

interface ItemProps {
  name: string;
  label: string;
  icon: string;
}
export interface SwitchProps extends InterfaceHStackProps {
  data: Array<ItemProps>;
  value: string;
  onChange: () => void;
}
const Switch: React.FC<SwitchProps> = (props) => {
  const { value, data, onChange, ...rest } = props;

  return (
    <RowAround
      borderWidth={0.4}
      overflow="hidden"
      borderRadius={5}
      borderColor="border.sharp"
      {...rest}
    >
      {data.map((item: ItemProps) => (
        <Pressable flex={1} onPress={value == item.name ? null : onChange} key={item.name}>
          <RowAround p={13} background={value == item.name ? "secondary" : "transparent"}>
            <Text color={value == item.name ? "text.light" : "text.main"}>{item.label}</Text>
            <Icon
              as={SimpleLineIcons}
              name={item.icon}
              size={5}
              color={value == item.name ? "text.light" : "text.main"}
            />
          </RowAround>
        </Pressable>
      ))}
    </RowAround>
  );
};

export default Switch;
