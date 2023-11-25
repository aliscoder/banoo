import { Card, Column, Error, Loading, Map, Row, RowBetween } from "@components";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useToast } from "@hooks";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useGetBarberInfoQuery } from "@state/api/client";
import { HStack, Icon, ScrollView, Text, View } from "native-base";
import React from "react";
import { Linking, Platform } from "react-native";

type Props = {
  id: string;
};
const Info: React.FC<Props> = ({ id }) => {
  const { navigate } = useNavigation<ClientScreenNavigationProp>();
  const { user, logout } = useAuth();

  const {
    isLoading: pageLoading,
    isError: pageError,
    data: info,
    refetch,
  } = useGetBarberInfoQuery(id);
  const { showError } = useToast();

  return pageLoading ? (
    <Loading />
  ) : pageError || !info ? (
    <Error />
  ) : (
    <View py={2} h="full">
      <Column space={5} height="full">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column space={5}>
            <Card transparent title="مشخصات" padding={2}>
              <Column space={4}>
                <Text color="text.main" fontSize="sm" lineHeight="2xl">
                  {info.bio}
                </Text>
                <RowBetween mt={4}>
                  <Row space={2} alignItems="center">
                    <Icon as={Ionicons} name="call-outline" color="text.secondary" size="sm" />
                    <Text fontSize="sm" color="text.muted">
                      {info.phone}
                    </Text>
                  </Row>
                  <Row space={4} alignItems="center">
                    <Icon
                      as={Ionicons}
                      name="call"
                      onPress={() => Linking.openURL(`tel:${info.phone}`)}
                      color="text.secondary"
                      size="md"
                    />
                    <Icon
                      as={MaterialCommunityIcons}
                      onPress={() => Linking.openURL(`sms:${info.phone}`)}
                      name="message"
                      color="text.secondary"
                      size="md"
                    />
                    <Icon
                      as={MaterialCommunityIcons}
                      onPress={() => Linking.openURL(`http://instagram.com/${info.instagram}`)}
                      name="instagram"
                      color="text.secondary"
                      size="md"
                    />
                    <Icon
                      as={MaterialCommunityIcons}
                      onPress={() => Linking.openURL(`${info.website}`)}
                      name="web"
                      color="text.secondary"
                      size="md"
                    />
                  </Row>
                </RowBetween>
              </Column>
            </Card>

            {Platform.OS !== "web" && (
              <Card title="آدرس" padding={2} mt={5} transparent>
                <Map height={155} viewOnly coords={info!.location!.coordinates} />
              </Card>
            )}

            <Card transparent title="روز و ساعات کاری" mt={15} padding={2}>
              <Column>
                <HStack justifyContent="space-around" mt={5}>
                  <Column alignItems="center">
                    <Text fontSize="md" color="text.secondary">
                      استراحت
                    </Text>
                    {info.workTime?.map((item) => (
                      <Text key={item.day} fontSize="sm" color="text.main" my={2}>
                        {item.rest.start} - {item.rest.end}
                      </Text>
                    ))}
                  </Column>
                  <Column alignItems="center">
                    <Text fontSize="md" color="text.secondary">
                      ساعات کاری
                    </Text>
                    {info.workTime?.map((item) => (
                      <Text key={item.day} fontSize="sm" color="text.main" my={2}>
                        {item.start} - {item.end}
                      </Text>
                    ))}
                  </Column>

                  <Column>
                    <Text fontSize="md" color="text.secondary">
                      روز هفته
                    </Text>
                    {info.workTime?.map((item) => (
                      <Text key={item.day} fontSize="sm" color="text.main" my={2}>
                        {item.day}
                      </Text>
                    ))}
                  </Column>
                </HStack>
              </Column>
            </Card>
          </Column>
        </ScrollView>
      </Column>
    </View>
  );
};

export default Info;
