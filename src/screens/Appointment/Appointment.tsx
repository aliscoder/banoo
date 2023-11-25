import {
  Column,
  ConfirmationModal,
  Container,
  Error,
  Loading,
  TextNormal,
  TextTitle,
  Touch,
} from "@components";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useAppDispatch, useAuth, useModal } from "@hooks";
import { apptClient } from "@screens/Barber/utils";
import apptApi, { useGetAppointmentQuery } from "@state/api/appointment";
import barberApi from "@state/api/barber";
import { getHourAndMinute } from "@utils";
import moment from "jalali-moment";
import { Icon, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { useApptSocket } from "./AppointmentProvider";
import { ActionCard } from "./Components/ActionCard";
import AppointmentCard from "./Components/AppointmentCard";
import ChatSection from "./Components/ChatSection";
import DescriptionSection from "./Components/DescriptionSection";
import { useNavigation } from "@react-navigation/core";

const Appointment = ({ id }: { id: string }) => {
  const { isBarber } = useAuth();
  const { data: appointment, isLoading, isError, refetch } = useGetAppointmentQuery(id);
  const socket = useApptSocket();
  const [selectedStatus, setSelectedStatus] = useState(appointment?.status);
  const { isOpen, openModal, closeModal } = useModal();
  const { navigate } = useNavigation();

  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    if (appointment && selectedStatus) {
      closeModal();
      socket.emit("change-appt-status", { apptId: id, status: selectedStatus });
      dispatch(
        apptApi.util.updateQueryData("getAppointment", id, (draft) => {
          Object.assign(draft, { ...draft, status: selectedStatus });
        })
      );

      dispatch(barberApi.util.invalidateTags(["Schedule", "Appointments", "Pending"]));
    }
  };

  useEffect(() => {
    socket.on("status-changed", (newStatus) => {
      dispatch(
        apptApi.util.updateQueryData("getAppointment", id, (draft) => {
          Object.assign(draft, { ...draft, status: newStatus });
        })
      );

      dispatch(barberApi.util.invalidateTags(["Schedule", "Appointments", "Pending"]));
    });
  }, [socket]);

  return isLoading ? (
    <Loading />
  ) : isError || !appointment ? (
    <Error />
  ) : (
    <Container
      headerRightElement={
        <Column>
          <TextTitle>{`قرار نوبت با ${
            isBarber ? apptClient(appointment).name! : appointment.barber.shopName
          }`}</TextTitle>
          <TextNormal>{appointment.barber.name}</TextNormal>
        </Column>
      }
      headerLeftElement={
        //@ts-ignore
        <Touch onPress={() => navigate("Main", { screen: "Appointments" })}>
          <Icon size="lg" name="arrow-left" as={SimpleLineIcons} color="text.muted" />
        </Touch>
      }
    >
      <AppointmentCard isClient={!isBarber} noNav withService={false} appointment={appointment} />
      {appointment?.status !== "completed" &&
        appointment?.status !== "cancelled" &&
        !appointment.guest && (
          <ActionCard
            isTimePassed={
              moment
                .unix(appointment.date)
                .clone()
                .set({
                  hour: getHourAndMinute(appointment?.startTime).hour,
                  minute: getHourAndMinute(appointment?.startTime).minute,
                })
                .diff(moment()) < 0
            }
            apptStatus={appointment?.status}
            onChangeStatus={(status) => {
              setSelectedStatus(status);
              openModal();
            }}
          />
        )}
      <DescriptionSection appointment={appointment} />

      {!appointment.guest && <ChatSection appointment={appointment} />}

      <ConfirmationModal
        isOpen={isOpen}
        onClose={closeModal}
        onReject={closeModal}
        onConfirm={handleConfirm}
      >
        <Text color="text.dark" fontSize="lg">
          {`آیا از ${
            selectedStatus === "approved"
              ? "موافقت با "
              : selectedStatus === "rejected"
              ? "عدم موافقت با "
              : selectedStatus === "completed"
              ? "تکمیل "
              : selectedStatus === "cancelled"
              ? "لغو "
              : ""
          } نوبت اطمینان دارید`}
        </Text>
      </ConfirmationModal>
    </Container>
  );
};

export default Appointment;
