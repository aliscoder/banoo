import { Column, List, Row, TextMuted, TextTiny, TextTitle } from "@components";
import { useAuth, useBarberNavigator } from "@hooks";
import { useGetScheduleQuery } from "@state/api/barber";
import { AppointmentInterface } from "@types";
import { CONVERTER, STATUS } from "@utils";
import { isEqual } from "lodash";
import { Pressable, View } from "native-base";
import React, { memo, useCallback } from "react";
import { apptClient } from "../utils";

type Props = {
  selected: number;
};

const ApptList: React.FC<Props> = ({ selected }) => {
  const { navigateToAppt } = useBarberNavigator();
  const { user } = useAuth();

  const {
    data: selectedDayAppts,
    isLoading,
    isError,
    refetch,
  } = useGetScheduleQuery({
    barberId: user._id,
    day: selected,
  });

  const renderApptBar = useCallback(
    ({ item, index }: { item: AppointmentInterface; index: number }) => {
      return (
        <Pressable onPress={() => navigateToAppt(item._id)}>
          <Row h={Math.ceil(item.endTime - item.startTime) * 16} space={2} mt={index === 0 ? 0 : 5}>
            <View
              flex={1}
              h="full"
              px={3}
              borderRightWidth={4}
              borderRadius={2}
              borderRightColor={STATUS(item.status)}
              background="card.background"
            >
              <Column>
                <TextTitle>{apptClient(item).name}</TextTitle>

                {item.services.map((item) => (
                  <TextMuted key={item.name}>{item.name}</TextMuted>
                ))}
              </Column>
            </View>
            <Column
              justifyContent="space-between"
              alignItems="center"
              w={10}
              h="full"
              borderRadius={5}
              background="card.background"
            >
              <TextTiny>{CONVERTER(item.startTime)}</TextTiny>
              <TextTiny>{CONVERTER(item.endTime)}</TextTiny>
            </Column>
          </Row>
        </Pressable>
      );
    },
    []
  );
  return (
    <View flex={1} mt={4}>
      <List
        isPerformant
        refreshData={refetch}
        isLoading={isLoading}
        isError={isError}
        contentContainerStyle={{ paddingBottom: 10 }}
        data={selectedDayAppts}
        estimatedItemSize={25}
        renderItem={renderApptBar}
      />
    </View>
  );
};

export default memo(ApptList, isEqual);
