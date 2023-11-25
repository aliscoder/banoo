import { Container, List } from "@components";
import { useAuth } from "@hooks";
import { useGetAppointmentsQuery } from "@state/api/appointment";
import { getHourAndMinute } from "@utils";
import moment from "jalali-moment";
import { View } from "native-base";
import React from "react";
import AppointmentCard from "../../Appointment/Components/AppointmentCard";

const PastAppointment = () => {
  const { user } = useAuth();
  const { isLoading, isError, data, isFetching, refetch } = useGetAppointmentsQuery(user._id);

  const pastApps = data
    ?.filter((app) => {
      const modifiedAppDate = moment
        .unix(app.date)
        .clone()
        .set({
          hour: getHourAndMinute(app.startTime).hour,
          minute: getHourAndMinute(app.startTime).minute,
        });
      const diff = moment(modifiedAppDate).diff(moment());
      return diff < 0;
    })
    .sort((a, b) => a.date - b.date);

  return (
    <Container hasHeader={false} px={3}>
      <List
        isPerformant
        space={3}
        isFetching={isFetching}
        estimatedItemSize={50}
        onRefetch={refetch}
        isLoading={isLoading}
        isError={isError}
        data={pastApps}
        renderItem={({ item, index }) => (
          <View mt={index === 0 ? 0 : 4}>
            <AppointmentCard appointment={item} />
          </View>
        )}
      />
    </Container>
  );
};

export default PastAppointment;
