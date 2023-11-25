import { Card, Column, List, TextNormal, TextTiny } from "@components";
import useReservationDays from "@screens/Barber/Calendar/Reservation/hooks/useReservationDays";
import { WorkTimeType } from "@types";
import moment from "jalali-moment";
import { isEqual } from "lodash";
import { Pressable } from "native-base";
import React, { memo, useCallback } from "react";

type Props = {
  length?: number;
  selected: number | undefined;
  onChangeDate: (day: number) => void;
  barberWorkTime?: WorkTimeType[];
};
const DateSection: React.FC<Props> = ({ barberWorkTime, selected, length = 10, onChangeDate }) => {
  const reservationDays = useReservationDays(length, barberWorkTime);

  const keyExtractHandler = useCallback((item: number) => {
    return item.toString();
  }, []);

  const renderDates = useCallback(
    ({ item }: { item: number }) => (
      <Pressable onPress={() => onChangeDate(item)}>
        <Column
          background={
            selected && moment.unix(selected).isSame(moment.unix(item), "day")
              ? "success"
              : "transparent"
          }
          px={3}
          py={1}
          ml={1}
          w="20"
          space={1}
          borderRadius={5}
          alignItems="center"
        >
          <TextNormal color="text.main">{moment.unix(item).format("dddd")}</TextNormal>
          <TextTiny color="text.muted">{moment.unix(item).format("DD")}</TextTiny>
          <TextTiny color="text.muted">{moment.unix(item).format("jMMM")}</TextTiny>
        </Column>
      </Pressable>
    ),
    [selected]
  );

  return (
    <Card title="انتخاب روز" subtitle="روز مورد نظر را از بین روز های مورد نظر انتخاب کنید">
      <List
        keyExtractor={keyExtractHandler}
        horizontal
        inverted
        showsHorizontalScrollIndicator={false}
        data={reservationDays}
        renderItem={renderDates}
      />
    </Card>
  );
};

export default memo(DateSection, isEqual);
