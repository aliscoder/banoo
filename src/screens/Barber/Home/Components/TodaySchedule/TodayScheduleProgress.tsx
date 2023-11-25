import { Column, RowBetween, TextMuted } from "@components";
import { AppointmentInterface } from "@types";
import { Box, View } from "native-base";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

interface TimeTrackerProps {
  start: number;
  end: number;
}
const TimeTracker: React.FC<TimeTrackerProps> = ({ start, end }) => {
  return (
    <Box
      position="absolute"
      left={start}
      borderRadius={5}
      w={end - start}
      height="full"
      background="secondary"
    />
  );
};

interface Props {
  appts: AppointmentInterface[] | undefined;
}
const TodayScheduleProgress: React.FC<Props> = ({ appts }) => {
  const [width, setWidth] = useState(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  }, []);

  const DayTracker = () => {
    return (
      <View
        position="relative"
        background="bg.muted"
        height={0.5}
        my={1}
        borderRadius={5}
        w="full"
        onLayout={handleLayout}
      >
        {appts?.map((app, index) => (
          <TimeTracker
            key={index}
            start={(app.startTime * width) / 24}
            end={(app.endTime * width) / 24}
          />
        ))}
      </View>
    );
  };

  return (
    <Column space={1}>
      <DayTracker />
      <RowBetween>
        <TextMuted>00 : 00</TextMuted>
        <TextMuted>24 : 00</TextMuted>
      </RowBetween>
    </Column>
  );
};

export default TodayScheduleProgress;
