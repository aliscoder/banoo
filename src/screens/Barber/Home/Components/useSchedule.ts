import { useAuth } from "@hooks";
import { useGetAppointmentsQuery } from "@state/api/appointment";
import { getHourAndMinute } from "@utils";
import moment, { Moment } from "jalali-moment";
import { useMemo } from "react";

const isApptTimePassed = ({
  apptDay,
  apptStartTime,
  targetDay = moment(),
}: {
  apptDay: number;
  apptStartTime: number;
  targetDay?: Moment;
}) => {
  const modifiedAppDate = moment
    .unix(apptDay)
    .clone()
    .set({
      hour: getHourAndMinute(apptStartTime).hour,
      minute: getHourAndMinute(apptStartTime).minute,
    });

  const diff = moment(modifiedAppDate).diff(targetDay);

  return diff < 0;
};

const useSchedule = (selectedDay?: number) => {
  const { user } = useAuth();

  const { data: totalAppts, isLoading, isError } = useGetAppointmentsQuery(user._id);

  const completed = useMemo(() => {
    const total = totalAppts?.filter(
      (appt) =>
        isApptTimePassed({ apptDay: appt.date, apptStartTime: appt.startTime }) &&
        (appt.status === "approved" || appt.status === "completed")
    );

    const lastWeek = totalAppts?.filter(
      (appt) =>
        isApptTimePassed({
          apptDay: appt.date,
          apptStartTime: appt.startTime,
          targetDay: moment().subtract(7, "day"),
        }) &&
        (appt.status === "approved" || appt.status === "completed")
    );

    return { total, lastWeek };
  }, [totalAppts]);

  const income = useMemo(() => {
    const total = totalAppts
      ?.filter(
        (appt) =>
          isApptTimePassed({ apptDay: appt.date, apptStartTime: appt.startTime }) &&
          (appt.status === "approved" || appt.status === "completed")
      )
      .reduce((acc, curr) => acc + curr.services.reduce((acc, curr) => acc + curr.price, 0), 0);

    const lastWeek = totalAppts
      ?.filter(
        (appt) =>
          isApptTimePassed({
            apptDay: appt.date,
            apptStartTime: appt.startTime,
            targetDay: moment().subtract(7, "day"),
          }) &&
          (appt.status === "approved" || appt.status === "completed")
      )
      .reduce((acc, curr) => acc + curr.services.reduce((acc, curr) => acc + curr.price, 0), 0);

    return { total, lastWeek };
  }, [totalAppts]);

  const todayAppts = useMemo(() => {
    return totalAppts?.filter(
      (appt) =>
        moment.unix(appt.date).isSameOrAfter(moment().startOf("day"), "day") &&
        moment.unix(appt.date).isBefore(moment().add(1, "day"), "day")
    );
  }, [totalAppts]);

  const selectedDayAppts = useMemo(() => {
    return totalAppts?.filter((appt) => moment(appt.date).isSame(selectedDay, "day"));
  }, [selectedDay, totalAppts]);

  const pendingAppts = useMemo(() => {
    return totalAppts
      ?.filter(
        (appt) => moment.unix(appt.date).isAfter(moment(), "second") && appt.status === "pending"
      )
      .sort((a, b) => moment.unix(a.date).unix() - moment(b.date).unix());
  }, [totalAppts]);

  return {
    isLoading,
    isError,
    totalAppts,
    completed,
    income,
    todayAppts,
    selectedDayAppts,
    pendingAppts,
  };
};

export default useSchedule;
