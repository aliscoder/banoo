import { Container } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/core";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Banner } from "@utils";
import { LinearGradient } from "expo-linear-gradient";
import { Icon, Pressable, useTheme } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Info from "./Info";
import Medal from "./Medal";
import Reviews from "./Reviews";
import Sample from "./Sample";
import Services from "./Services";
import TopTabOptions from "./TopTabOptions";
const BarberProfileTopTab = createMaterialTopTabNavigator();

const BarberProfile = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation<ClientScreenNavigationProp>();

  const theme = useTheme();

  return (
    <Container isInSafeArea={false} px={0} hasHeader={false}>
      <ImageBackground
        source={Banner}
        style={{
          width: "100%",
          height: 180,
          borderWidth: 0,
          position: "relative",
        }}
      >
        <LinearGradient
          colors={[theme.colors.primary, "transparent"]}
          style={styles.gradBottom}
          start={{ x: 0, y: 1.0 }}
          end={{ x: 0, y: 0 }}
        />
        <LinearGradient
          colors={[theme.colors.primary, "transparent"]}
          style={styles.gradTop}
          start={{ x: 1.0, y: 0 }}
          end={{ x: 1.0, y: 1.0 }}
        />
        <Pressable onPress={() => navigate("Notification")} m={5}>
          <Icon as={Ionicons} name="notifications" size="lg" color="text.light" />
        </Pressable>
      </ImageBackground>

      <BarberProfileTopTab.Navigator style={{ marginHorizontal: 15 }} screenOptions={TopTabOptions}>
        <BarberProfileTopTab.Screen
          options={{ title: "مشخصات" }}
          name="Info"
          children={() => <Info id={user.barber} />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "نظرات" }}
          name="Reviews"
          children={() => <Reviews id={user.barber} />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "خدمات" }}
          name="Services"
          children={() => <Services id={user.barber} />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "نمونه کار" }}
          name="Sample"
          children={() => <Sample id={user.barber} />}
        />
        <BarberProfileTopTab.Screen
          options={{ title: "مدارک" }}
          name="Medal"
          children={() => <Medal id={user.barber} />}
        />
      </BarberProfileTopTab.Navigator>
    </Container>
  );
};
const styles = StyleSheet.create({
  gradBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
  gradTop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "40%",
  },
});
export default BarberProfile;
