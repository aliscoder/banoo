import { Card, Column, Row, RowBetween, TextNormal, Toggle } from "@components";
import React, { FC, memo, useCallback, useMemo } from "react";
import TimeInput from "./TimeInput";
import { useWorktimeContext } from "./workTimeContext";

type Props = { item: string };

const DayRow: FC<Props> = ({ item: day }) => {
  const { dispatch, state } = useWorktimeContext();

  const handleChangeStartText = useCallback((text: string) => {
    dispatch({ type: "start", payload: { day, text } });
  }, []);

  const handleChangeEndText = useCallback((text: string) => {
    dispatch({ type: "end", payload: { day, text } });
  }, []);

  const handleChangeRestStartText = useCallback((text: string) => {
    dispatch({ type: "restStart", payload: { day, text } });
  }, []);

  const handleChangeRestEndText = useCallback((text: string) => {
    dispatch({ type: "restEnd", payload: { day, text } });
  }, []);

  const handleToggle = () => {
    dispatch({ type: "activate", payload: day });
  };

  const workDay = useMemo(() => state.find((item) => item.day === day), [state]);

  return (
    <Card
      borderBottomWidth={workDay?.day === "جمعه" ? 0 : 1}
      borderBottomColor="dash"
      pb={8}
      transparent
      title={day}
      leftTitleElement={
        <Toggle isChecked={state.some((item) => item.day === day)} onToggle={handleToggle} />
      }
    >
      <Column>
        <RowBetween>
          <Row space={4}>
            <TimeInput
              placeholder="ساعت شروع"
              isDisabled={!Boolean(workDay)}
              selected={Boolean(workDay)}
              onChangeText={handleChangeStartText}
              value={workDay?.start.toString()}
            />
            <TimeInput
              isDisabled={!Boolean(workDay)}
              placeholder="ساعت پایان"
              selected={Boolean(workDay)}
              onChangeText={handleChangeEndText}
              value={workDay?.end.toString()}
            />
          </Row>
          <TextNormal>ساعات کاری</TextNormal>
        </RowBetween>

        <RowBetween mt={3}>
          <Row space={4}>
            <TimeInput
              placeholder="ساعت شروع"
              isDisabled={!Boolean(workDay)}
              selected={Boolean(workDay)}
              onChangeText={handleChangeRestStartText}
              value={workDay?.rest.start.toString()}
            />
            <TimeInput
              placeholder="ساعت پایان"
              isDisabled={!Boolean(workDay)}
              selected={Boolean(workDay)}
              onChangeText={handleChangeRestEndText}
              value={workDay?.rest.end.toString()}
            />
          </Row>
          <TextNormal>ساعات استراحت</TextNormal>
        </RowBetween>
      </Column>
    </Card>
  );
};

export default memo(DayRow);
