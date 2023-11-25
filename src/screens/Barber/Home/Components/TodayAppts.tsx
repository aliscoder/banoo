import {
  Avatar,
  Card,
  ColumnCentered,
  List,
  Skeleton,
  TextMuted,
  TextTiny,
  TextTitle,
} from "@components";
import { useBarberNavigator } from "@hooks";
import { apptClient } from "@screens/Barber/utils";
import { AppointmentInterface } from "@types";
import { Center, Pressable, Text } from "native-base";
import React, { useCallback } from "react";
import useSchedule from "./useSchedule";

const TodayAppts = () => {
  const { todayAppts, isLoading } = useSchedule();
  const { navigateToAppt } = useBarberNavigator();

  const NoItemFound = () => {
    return (
      <Center>
        <TextTitle color="danger">موردی یافت نشد</TextTitle>
      </Center>
    );
  };

  const renderApptCard = useCallback(
    ({ item, index }: { item: AppointmentInterface; index: number }) => {
      return (
        <Pressable w={48} ml={index !== 0 ? 5 : 0} onPress={() => navigateToAppt(item._id)}>
          <Card py={4}>
            <ColumnCentered space={1}>
              <Avatar uri={apptClient(item).avatar} />
              <Text>{apptClient(item).name}</Text>

              <TextTiny color="text.muted" key={index}>
                {item.services[0].name}
              </TextTiny>

              <TextMuted>{`${item.startTime} - ${item.endTime}`}</TextMuted>
              {/* <Button w="full" p={0} titleColor="text.dark" title="بررسی" /> */}
            </ColumnCentered>
          </Card>
        </Pressable>
      );
    },
    []
  );
  return (
    <Skeleton isLoaded={!isLoading} h="40" mt={5}>
      <Card transparent title="قرارهای امروز">
        <List
          isPerformant
          estimatedItemSize={80}
          horizontal
          data={todayAppts}
          keyExtractor={(item) => item._id}
          renderItem={renderApptCard}
        />
      </Card>
    </Skeleton>
  );
};

export default TodayAppts;
