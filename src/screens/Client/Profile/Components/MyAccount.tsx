import { Avatar, Background, Column } from "@components";
import { useAuth, usePhoto, useShop } from "@hooks";
import { Center, Pressable, Text, View } from "native-base";
import React from "react";

interface Props {
  onPress: () => void;
}

const MyAccount: React.FC<Props> = ({ onPress }) => {
  const { user } = useAuth();
  const shop = useShop();

  return (
    <View h="1/3" w="full">
      <Pressable onPress={onPress}>
        <Background style={{ borderWidth: 0 }} size="100%" placholder={shop?.logoImage}>
          <Center flex={1}>
            <Column space={2}>
              <Avatar onPress={onPress} uri={user.avatar} size="2xl" />
              <Text textAlign="center" fontSize="xl" color="text.main">
                {user.name}
              </Text>
            </Column>
          </Center>
        </Background>
      </Pressable>
    </View>
  );
};

export default MyAccount;
