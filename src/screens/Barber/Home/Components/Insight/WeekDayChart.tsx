import { ColumnCentered, RowCentered, TextMuted } from "@components";
import { AppointmentInterface } from "@types";
import { unix } from "@utils";
import moment from "jalali-moment";
import { View } from "native-base";
import { memo, useMemo } from "react";

interface Props {
  appts: AppointmentInterface[] | undefined;
}
const WeekDaysChart: React.FC<Props> = ({ appts }) => {
  const weekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = unix(moment().startOf("week").clone().add(i, "days"));
      days.push(day);
    }

    return days;
  }, []);

  return (
    <View p={5} h={56}>
      <RowCentered flex={1} space={2}>
        {weekDays.map((day, i) => {
          return (
            <ColumnCentered key={i}>
              <View
                position="relative"
                w={8}
                h="full"
                borderBottomWidth={2}
                borderBottomColor="success"
              >
                <View
                  position="absolute"
                  w="full"
                  bottom={0}
                  height={
                    appts?.filter((appt) => moment.unix(appt.date).isSame(moment.unix(day), "day"))
                      .length
                  }
                  bg="success"
                />
              </View>
              <TextMuted>{moment.unix(day).format("dddd")[0]}</TextMuted>
            </ColumnCentered>
          );
        })}
      </RowCentered>
    </View>
  );
};

export default memo(WeekDaysChart);
