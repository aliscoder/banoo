import { Container, List } from "@components";
import { useAuth } from "@hooks";
import { useGetAppointmentsQuery } from "@state/api/appointment";
import { getHourAndMinute } from "@utils";
import moment from "jalali-moment";
import { View } from "native-base";
import React from "react";
import AppointmentCard from "../../Appointment/Components/AppointmentCard";

const UpcomingAppointment = () => {
  const { user } = useAuth();
  const { isLoading, isError, data, isFetching, refetch } = useGetAppointmentsQuery(user._id);

  const upcomingApps = data
    ?.filter((app) => {
      const modifiedAppDate = moment
        .unix(app.date)
        .clone()
        .set({
          hour: getHourAndMinute(app.startTime).hour,
          minute: getHourAndMinute(app.startTime).minute,
        });
      const diff = moment(modifiedAppDate).diff(moment());
      return diff > 0;
    })
    .sort((a, b) => a.date - b.date);

  return (
    <Container hasHeader={false} px={3}>
      <List
        isPerformant
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        space={3}
        estimatedItemSize={50}
        onRefetch={refetch}
        data={upcomingApps}
        renderItem={({ item, index }) => (
          <View mt={index === 0 ? 0 : 4}>
            <AppointmentCard appointment={item} />
          </View>
        )}
      />
    </Container>
  );
};

export default UpcomingAppointment;
