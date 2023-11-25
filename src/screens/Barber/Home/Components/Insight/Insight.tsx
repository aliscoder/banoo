import { Card, Loading } from "@components";
import { isEqual } from "lodash";
import { ScrollView } from "native-base";
import React, { memo } from "react";
import useSchedule from "../useSchedule";
import WeekDaysChart from "./WeekDayChart";

const Insight = () => {
  const { isLoading, completed } = useSchedule();

  return (
    <Card title="نمودار آماری">
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card transparent px={0} centerTitle subtitle="قرارهای به اتمام رسیده">
            <WeekDaysChart appts={completed.total} />
          </Card>
          <Card transparent px={0} centerTitle ml={5} subtitle="درامد">
            <WeekDaysChart appts={completed.total} />
          </Card>
        </ScrollView>
      )}
    </Card>
  );
};

export default memo(Insight, isEqual);
