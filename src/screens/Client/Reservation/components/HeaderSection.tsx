import { Column, RowBetween, TextNormal, TextTiny } from "@components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import React, { memo } from "react";

type Props = {
  name: string;
  address: string | undefined;
};
const HeaderSection: React.FC<Props> = ({ name, address }) => {
  const { goBack } = useNavigation<ClientScreenNavigationProp>();
  return (
    <RowBetween p={3}>
      <Icon as={SimpleLineIcons} onPress={goBack} name="arrow-left" color="text.main" size="md" />
      <Column>
        <TextNormal color="text.main">{name}</TextNormal>
        {address && <TextTiny color="text.muted">{address}</TextTiny>}
      </Column>
    </RowBetween>
  );
};

export default memo(HeaderSection);
