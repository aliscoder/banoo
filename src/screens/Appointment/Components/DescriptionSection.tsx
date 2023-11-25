import { Card, Column, Row } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useLocation } from "@hooks";
import { AppointmentInterface } from "@types";
import { CONVERTER, price } from "@utils";
import moment from "jalali-moment";
import { Icon, Pressable, Text } from "native-base";
import React, { memo } from "react";
import { Linking } from "react-native";
import { makeRoutingURL } from "./utils";

type Props = {
  appointment: AppointmentInterface;
};
const DescriptionSection: React.FC<Props> = ({ appointment }) => {
  const { lastLocation: location } = useLocation();
  const { isBarber } = useAuth();
  const directionURL = !isBarber
    ? makeRoutingURL(location, appointment.barber.location?.coordinates)
    : null;
  return (
    <Card my={3}>
      <Column space={3} alignItems="flex-end">
        <Row alignItems="center" space={5}>
          <Column alignItems="flex-end">
            <Text fontSize="md" color="text.main">
              {moment.unix(appointment.date).format("dddd , D MMM y")}
            </Text>
            <Text fontSize="sm" color="text.muted">
              {CONVERTER(appointment.startTime)} - {CONVERTER(appointment.endTime)}
            </Text>
          </Column>
          <Icon as={Ionicons} name="time" color="text.secondary" />
        </Row>
        <Row alignItems="center" space={5}>
          <Column>
            {appointment.services.map((service, index) => (
              <Text key={service.name} fontSize="xs" color="text.muted">
                {`${index + 1} - ${service.name}`}
              </Text>
            ))}
          </Column>

          <Icon as={Ionicons} name="clipboard" color="text.secondary" />
        </Row>
        {!isBarber && (
          <Row w="full" alignItems="center" justifyContent="space-between">
            {directionURL ? (
              <Pressable onPress={() => Linking.openURL(directionURL)}>
                <Text fontSize="md" color="text.secondary">
                  مسیر یابی
                </Text>
              </Pressable>
            ) : (
              <Pressable onPress={() => Linking.openSettings()}>
                <Text fontFamily="YekanBold" color="danger">
                  مکانیابی را فعال کنید
                </Text>
              </Pressable>
            )}

            <Row alignItems="center" space={5}>
              <Column alignItems="flex-end">
                <Text fontSize="md" color="text.main">
                  {appointment.barber.shopName}
                </Text>
                <Text fontSize="sm" color="text.muted">
                  {appointment.barber.address}
                </Text>
              </Column>
              <Icon as={Ionicons} name="location" color="text.secondary" />
            </Row>
          </Row>
        )}
        <Row alignItems="center" space={5}>
          <Text fontSize="md" color="text.main">
            {price(appointment.price)} تومان
          </Text>
          <Icon as={Ionicons} name="card" color="text.secondary" />
        </Row>
      </Column>
    </Card>
  );
};

export default memo(DescriptionSection);
