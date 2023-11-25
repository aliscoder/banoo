import {
  Card,
  Column,
  Error,
  Loading,
  Row,
  RowBetween,
  TextNormal,
  TextTiny,
  Touch,
} from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useBarberNavigator } from "@hooks";
import { useGetBarberInfoQuery } from "@state/api/client";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, ScrollView, View, useTheme } from "native-base";
import React, { FC } from "react";
import { ImageBackground, StyleSheet } from "react-native";

interface Props {
  id: string;
}

const Info: FC<Props> = ({ id }) => {
  const {
    isLoading: pageLoading,
    isError: pageError,
    data: info,
    refetch,
  } = useGetBarberInfoQuery(id);

  const theme = useTheme();
  const { navigateInShop } = useBarberNavigator();
  return pageLoading ? (
    <Loading />
  ) : pageError || !info ? (
    <Error />
  ) : (
    <View py={2} h="full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View pb={3}>
          <Card
            transparent
            leftTitleElement={
              <Touch onPress={() => navigateInShop({ screen: "About" })}>
                <Icon as={Ionicons} name="pencil" size="md" color="success" />
              </Touch>
            }
            title="مشخصات"
            // padding={2}
          >
            <Column space={4}>
              <TextTiny lineHeight="2xl">{info.bio}</TextTiny>
              <RowBetween mt={4}>
                <Row space={2}>
                  <Icon as={Ionicons} name="call-outline" color="text.secondary" size="sm" />
                  <TextTiny color="text.muted">{info.phone}</TextTiny>
                </Row>
              </RowBetween>
            </Column>
          </Card>

          <Card
            transparent
            leftTitleElement={
              !info.isCoworker && (
                <Touch onPress={() => navigateInShop({ screen: "Location" })}>
                  <Icon as={Ionicons} name="pencil" size="md" color="success" />
                </Touch>
              )
            }
            title="آدرس"
            padding={2}
            mt={5}
            shadowed={false}
          >
            <Column space={2}>
              <ImageBackground
                source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/Map.jpg` }}
                style={{
                  width: "100%",
                  height: 155,
                  paddingHorizontal: 10,
                  position: "relative",
                }}
              >
                <LinearGradient
                  colors={[theme.colors.black, "transparent"]}
                  style={styles.gradBottom}
                  start={{ x: 1, y: 1.5 }}
                  end={{ x: 0, y: 1.5 }}
                />
                <Column space={3} height="full">
                  <View p={2}>
                    <TextTiny color="text.light">{info.name}</TextTiny>
                    <TextTiny color="text.light">{info.address}</TextTiny>
                  </View>
                </Column>
              </ImageBackground>
            </Column>
          </Card>

          <Card
            transparent
            leftTitleElement={
              <Touch onPress={() => navigateInShop({ screen: "Schedule" })}>
                <Icon as={Ionicons} name="pencil" size="md" color="success" />
              </Touch>
            }
            title="روز و ساعات کاری"
            mt={5}
            padding={2}
          >
            <Column>
              <Row justifyContent="space-around" mt={5}>
                <Column alignItems="center">
                  <TextNormal color="text.secondary">استراحت</TextNormal>
                  {info.workTime?.map((item) => (
                    <TextTiny key={item.day} color="text.main" my={2}>
                      {item.rest.start} - {item.rest.end}
                    </TextTiny>
                  ))}
                </Column>
                <Column alignItems="center">
                  <TextNormal color="text.secondary">ساعات کاری</TextNormal>
                  {info.workTime?.map((item) => (
                    <TextTiny key={item.day} color="text.main" my={2}>
                      {item.start} - {item.end}
                    </TextTiny>
                  ))}
                </Column>

                <Column>
                  <TextNormal color="text.secondary">روز هفته</TextNormal>
                  {info.workTime?.map((item) => (
                    <TextTiny key={item.day} color="text.main" my={2}>
                      {item.day}
                    </TextTiny>
                  ))}
                </Column>
              </Row>
            </Column>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  gradBottom: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
    width: "70%",
    height: "100%",
  },
});

export default Info;
