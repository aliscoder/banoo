import { Container, List } from "@components";
import { useAuth } from "@hooks";
import AppointmentCard from "@screens/Appointment/Components/AppointmentCard";
import { useGetPendingAppointmentsQuery } from "@state/api/appointment";
import React from "react";

const Requested = () => {
  const { user } = useAuth();
  const { data: pendingAppts, isLoading } = useGetPendingAppointmentsQuery(user._id);
  return (
    <Container headerTitle="قرارهای در انتظار تایید" px={3}>
      <List
        data={pendingAppts}
        isLoading={isLoading}
        isPerformant
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <AppointmentCard mt={index !== 0 ? 5 : 0} appointment={item} withService isClient />
        )}
        estimatedItemSize={150}
        space={3}
      />
    </Container>
  );
};

export default Requested;
