import { Column, Container, Seperative, Touch } from "@components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useAuth, useBarberNavigator } from "@hooks";
import { BarberStackNavigationProp } from "@navigation/types/barberTypes";
import { useNavigation } from "@react-navigation/core";
import { Icon, ScrollView } from "native-base";
import React from "react";
import DesignCard from "./Components/DesignCard";
import Insight from "./Components/Insight/Insight";
import StatContainer from "./Components/Stats/Stats";
import useSchedule from "./Components/useSchedule";

const Home = () => {
  const { navigateInShop } = useBarberNavigator();
  const { logout } = useAuth();
  const { navigate } = useNavigation<BarberStackNavigationProp>();
  const { todayAppts } = useSchedule();

  return (
    <Container
      px={4}
      rightIconComponent={
        <Touch onPress={() => navigate("ChangePass")}>
          <Icon name="key" as={SimpleLineIcons} color="text.muted" size="lg" />
        </Touch>
      }
      headerLeftElement={
        <Touch onPress={logout}>
          <Icon name="power" as={SimpleLineIcons} color="text.muted" size="lg" />
        </Touch>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column space={3}>
          <Seperative>
            <DesignCard onPress={() => navigateInShop({ screen: "Entry" })} />
            {/* <ScheduleCard /> */}
            <StatContainer />
            {/* {todayAppts && todayAppts?.length > 0 && <TodayAppts />} */}
            <Insight />
          </Seperative>
        </Column>
      </ScrollView>
    </Container>
  );
};

export default Home;
