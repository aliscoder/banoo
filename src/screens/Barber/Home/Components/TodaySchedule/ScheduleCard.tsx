import { Card, Column, Row, Skeleton, TextTiny } from "@components";
import { AppStatusType } from "@types";
import { View } from "native-base";
import React from "react";
import useSchedule from "../useSchedule";
import TodayScheduleProgress from "./TodayScheduleProgress";

const StatusCircle = ({ type }: { type: AppStatusType }) => {
  const setScheme = () => {
    switch (type) {
      case "approved":
        return "success";
        break;
      case "pending":
        return "warning";
        break;
      case "rejected":
        return "danger";
        break;
      case "cancelled":
        return "danger";
        break;
      case "completed":
        return "success";
        break;
    }
  };
  return <View width={4} height={4} borderRadius="full" background={setScheme()} />;
};

const ScheduleCard = () => {
  const { isLoading, isError, todayAppts } = useSchedule();

  return (
    <Skeleton isLoaded={!isLoading} h="24">
      <Card title="برنامه امروز">
        <Column space={3}>
          <Row space={4}>
            <Row space={2}>
              <StatusCircle type="approved" />
              <TextTiny>{todayAppts?.filter((app) => app.status === "approved").length}</TextTiny>
            </Row>
            <Row space={2}>
              <StatusCircle type="pending" />
              <TextTiny>{todayAppts?.filter((app) => app.status === "pending").length}</TextTiny>
            </Row>
            <Row space={2}>
              <StatusCircle type="rejected" />
              <TextTiny>{todayAppts?.filter((app) => app.status === "rejected").length}</TextTiny>
            </Row>
            <Row space={2}>
              <StatusCircle type="cancelled" />
              <TextTiny>{todayAppts?.filter((app) => app.status === "cancelled").length}</TextTiny>
            </Row>
            <Row space={2}>
              <StatusCircle type="completed" />
              <TextTiny>{todayAppts?.filter((app) => app.status === "completed").length}</TextTiny>
            </Row>
          </Row>
          <TodayScheduleProgress appts={todayAppts} />
        </Column>
      </Card>
    </Skeleton>
  );
};

export default ScheduleCard;
