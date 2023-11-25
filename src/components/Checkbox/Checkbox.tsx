import { AntDesign } from "@expo/vector-icons";
import { Icon, Pressable, View } from "native-base";
import { useEffect, useState } from "react";
import { RowCentered } from "../Row/Row";
import { TextNormal } from "../Text/Text";

interface Props {
  active: boolean;
  onToggle?: () => void;
  changable?: boolean;
  title?: string;
}
function Checkbox({ active, onToggle, title, changable = true }: Props) {
  const [checked, setChecked] = useState(active);

  const handleChange = () => {
    if (changable && onToggle) {
      onToggle();
    }
  };

  useEffect(() => {
    setChecked(active);
  }, [active]);

  return (
    <Pressable py={3} onPress={changable ? handleChange : null}>
      <RowCentered space={3}>
        {title && <TextNormal color="secondary">{title}</TextNormal>}

        <View
          background={checked ? "secondary" : "transparent"}
          borderRadius={48}
          borderWidth={1.5}
          borderColor="secondary"
          p={checked ? 0 : 2.5}
        >
          {checked && <Icon color="text.light" as={AntDesign} size="md" name="check" />}
        </View>
      </RowCentered>
    </Pressable>
  );
}

export default Checkbox;
