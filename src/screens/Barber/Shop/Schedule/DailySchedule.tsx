import { isEqual } from "lodash";
import { ScrollView } from "native-base";
import React, { memo } from "react";
import DayRow from "./DayRow";
import { useWorktimeContext } from "./workTimeContext";

const DailySchedule = () => {
  const { days } = useWorktimeContext();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {days.map((day, index) => (
        <DayRow item={day} key={index} />
      ))}
    </ScrollView>
  );
};

export default memo(DailySchedule, isEqual);
