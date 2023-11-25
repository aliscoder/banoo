import { Card, List, Row, TextNormal, TextTiny, Touch } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useBarberNavigator } from "@hooks";
import { WorkTimeType } from "@types";
import moment from "jalali-moment";
import { Center, Icon, Pressable, VStack } from "native-base";
import React, { useCallback } from "react";
import useReservationDays from "../hooks/useReservationDays";
import { DEVICE } from "@utils";

type Props = {
  length?: number;
  selected: number | undefined;
  onChangeDate: (day: number) => void;
  barberWorkTime?: WorkTimeType[];
  hasLastDays?: boolean;
};
const DateSection: React.FC<Props> = ({
  selected,
  length = 10,
  barberWorkTime,
  onChangeDate,
  hasLastDays = false,
}) => {
  const { navigateInShop } = useBarberNavigator();
  const reservationDays = useReservationDays(length, barberWorkTime, hasLastDays);

  const keyExtractHandler = useCallback((item: number) => {
    return item.toString();
  }, []);

  const handleDayChange = useCallback(
    (item: number) => {
      onChangeDate(item);
    },
    [onChangeDate]
  );

  const renderDates = useCallback(
    ({ item }: { item: number }) => (
      <Pressable onPress={() => handleDayChange(item)}>
        <VStack
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
          <TextTiny color="text.main">{moment.unix(item).format("DD")}</TextTiny>
          <TextTiny color="text.main">{moment.unix(item).format("jMMM")}</TextTiny>
        </VStack>
      </Pressable>
    ),
    [selected]
  );

  return (
    <Card title="انتخاب روز" subtitle="روز مورد نظر را از بین روز های مورد نظر انتخاب کنید" h={48}>
      {reservationDays.length === 0 ? (
        <Center>
          <Row space={2}>
            <Touch onPress={() => navigateInShop({ screen: "Schedule" })}>
              <Icon as={Ionicons} name="pencil" size="xs" color="danger" />
            </Touch>
            <TextTiny color="danger">برنامه کاری شما نیاز به تکمیل دارد</TextTiny>
          </Row>
        </Center>
      ) : (
        <List
          extraData={selected}
          estimatedItemSize={25}
          data={reservationDays}
          keyExtractor={keyExtractHandler}
          horizontal
          inverted
          renderItem={renderDates}
        />
      )}
    </Card>
  );
};

export default DateSection;
