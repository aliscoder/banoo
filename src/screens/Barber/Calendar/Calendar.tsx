import { Badge, Container, Row, Touch } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useBarberNavigator } from "@hooks";
import { useGetPendingAppointmentsQuery } from "@state/api/appointment";
import { unix } from "@utils";
import { Icon, View } from "native-base";
import React, { PropsWithChildren, memo, useCallback, useState } from "react";
import ApptList from "./ApptList";
import DateSection from "./Reservation/components/DateSection";

const Wrapper: React.FC<PropsWithChildren> = memo(({ children }) => {
  const { navigateToRequestedAppts, navigateToReservation } = useBarberNavigator();
  const { user } = useAuth();
  const { data } = useGetPendingAppointmentsQuery(user._id);

  return (
    <Container
      px={3}
      headerTitle="قرار ملاقات ها"
      headerLeftElement={
        <Row space={1}>
          <Touch onPress={navigateToRequestedAppts}>
            <View position="relative">
              {data && data.length > 0 && <Badge sum={data.length} />}
              <Icon as={Ionicons} name="clipboard-outline" color="secondary" size="lg" />
            </View>
          </Touch>

          <Touch onPress={navigateToReservation}>
            <Icon as={Ionicons} name="add" color="secondary" size="2xl" />
          </Touch>
        </Row>
      }
    >
      {children}
    </Container>
  );
});

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(unix());

  const handleDayChange = useCallback((item: number) => {
    setSelectedDay(item);
  }, []);
  return (
    <Wrapper>
      <DateSection hasLastDays selected={selectedDay} length={20} onChangeDate={handleDayChange} />
      <ApptList selected={selectedDay} />
    </Wrapper>
  );
};

export default Calendar;
