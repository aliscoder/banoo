import {
  Avatar,
  Button,
  Column,
  ConfirmationModal,
  Container,
  Error,
  Loading,
  RowBetween,
  TextNormal,
  TextTiny,
  TextTitle,
} from "@components";
import { useAuth, useModal, useToast } from "@hooks";
import { ClientScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/native";
import { useRequestAppointmentMutation } from "@state/api/appointment";
import { useGetBarberQuery } from "@state/api/client";
import { useGetBarberFreeTimesMutation } from "@state/api/shared";
import { ServiceType } from "@types";
import { price } from "@utils";
import { ScrollView } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import DateSection from "./components/DateSection";
import HourSection, { Hour } from "./components/HourSection";
import ServiceSection from "./components/ServiceSection";

const Reservation = () => {
  const { replace } = useNavigation<ClientScreenNavigationProp>();
  const { showError } = useToast();
  const { user } = useAuth();
  const barberId = user.barber;

  const {
    isLoading: PAGE_LOADING,
    data: BARBER,
    isError: PAGE_ERROR,
  } = useGetBarberQuery(barberId);

  const [
    getBarberFreeTimes,
    { isLoading: GET_HOURS_LOADING, isError: GET_HOURS_ERROR, data: FREE_HOURS },
  ] = useGetBarberFreeTimesMutation();
  const [
    setAppointment,
    {
      isLoading: SET_APP_LOADING,
      isError: SET_APP_ERROR,
      isSuccess: SET_APP_SUCCESS,
      data: SET_APP,
      error: SET_APPT_ERROR_MSG,
    },
  ] = useRequestAppointmentMutation();

  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>();
  const [selectedHour, setSelectedHour] = useState<Hour>();
  const [canSelectHour, setCanselectHour] = useState(false);
  const { openModal, isOpen, closeModal } = useModal();

  const anyServiceSelected = selectedServices?.length > 0;
  useEffect(() => {
    if (SET_APP_ERROR) {
      //@ts-ignore
      showError(SET_APPT_ERROR_MSG.data.error);
    }
    if (SET_APP_SUCCESS && SET_APP) {
      replace("Appointment", { appointmentId: SET_APP._id });
    }
  }, [SET_APP_ERROR, SET_APP_SUCCESS]);

  const discounts = () => {
    let activeDiscounts = BARBER?.discounts?.filter((dis) => dis.isActive);
    let discountSum;

    if (!activeDiscounts || activeDiscounts.length < 1) {
      discountSum = 0;
    } else {
      discountSum =
        activeDiscounts.reduce((acc, curr) => acc + curr.percent, 0) / activeDiscounts.length;
    }

    return discountSum;
  };

  useEffect(() => {
    setSelectedHour(undefined);
    if (!anyServiceSelected) {
      setCalculatedPrice(0);
    } else {
      const exactPrice = selectedServices.reduce((acc, curr) => acc + curr.price, 0);

      const withDiscountPrice = exactPrice - (exactPrice * discounts()) / 100;
      setCalculatedPrice(withDiscountPrice);
    }

    if (selectedDay && anyServiceSelected) {
      getBarberFreeTimes({
        barberId,
        selectedDayUnix: selectedDay,
        serviceTime: selectedServices.reduce((acc, curr) => acc + curr.time, 0),
        isManual: false,
      });
    }
  }, [selectedDay, selectedServices]);

  useEffect(() => {
    if (!anyServiceSelected) {
      setCanselectHour(false);
    } else {
      setCanselectHour(true);
    }
  }, [selectedServices]);

  const handleServiceChange = useCallback((service: ServiceType) => {
    setSelectedServices((prev) => {
      return prev.find((item) => item.name === service.name)
        ? prev.filter((item) => item.name !== service.name)
        : [...prev, service];
    });
  }, []);

  const handleDateChange = useCallback(
    (date: number) => {
      setSelectedDay(date);
    },
    [selectedDay]
  );

  const handleHourChange = useCallback((hour: Hour) => {
    setSelectedHour(hour);
  }, []);

  const checkSelectedTime = () => {
    if (selectedHour?.inRest || selectedHour?.isLong) {
      openModal();
    } else {
      handleReservation();
    }
  };

  const handleConfirm = useCallback(() => {
    closeModal();
    handleReservation();
  }, [selectedHour]);

  const handleReject = useCallback(() => {
    closeModal();
  }, [selectedHour]);

  const handleReservation = () => {
    if (selectedDay && selectedHour && anyServiceSelected) {
      const data = {
        client: user._id,
        barber: barberId,
        date: selectedDay,
        startTime: selectedHour?.start,
        endTime: selectedHour?.end,
        services: selectedServices,
        price: calculatedPrice,
      };

      setAppointment(data);
    } else {
      showError("خدمات مورد نظر، روز و ساعت مورد نظر را انتخاب کنید");
    }
  };

  return !BARBER || PAGE_LOADING ? (
    <Loading />
  ) : PAGE_ERROR ? (
    <Error />
  ) : (
    <Container
      px={0}
      headerRightElement={
        <Column>
          <TextTitle>{`رزرو نوبت در ${BARBER.shopName}`}</TextTitle>
          <TextNormal>{BARBER.name}</TextNormal>
        </Column>
      }
      headerLeftElement={<Avatar size="sm" uri={BARBER.avatar} />}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column px={2} space={2} pb={20}>
          <ServiceSection
            services={BARBER.services}
            selected={selectedServices}
            onChangeService={handleServiceChange}
          />

          <DateSection
            barberWorkTime={BARBER.workTime}
            selected={selectedDay}
            onChangeDate={handleDateChange}
          />

          <HourSection
            selected={selectedHour}
            onChangeHour={handleHourChange}
            hours={canSelectHour ? FREE_HOURS : undefined}
            isLoading={GET_HOURS_LOADING}
          />
        </Column>
      </ScrollView>

      <RowBetween
        width="100%"
        borderTopWidth={0.5}
        borderTopColor="dash"
        background="primary"
        position="absolute"
        bottom={0}
        px={3}
        py={2}
      >
        <Column>
          <TextNormal color="text.secondary">{price(calculatedPrice) + "تومان "}</TextNormal>
          {BARBER?.discounts && BARBER?.discounts.filter(item => item.isActive).length > 0 && (
            <TextTiny color="success">{`با تخفیف ${discounts()} درصدی`}</TextTiny>
          )}
        </Column>

        <Button
          isLoading={SET_APP_LOADING}
          title="رزرو"
          w="1/3"
          p={1.5}
          scheme="success"
          onPress={checkSelectedTime}
        />
      </RowBetween>
      <ConfirmationModal
        onClose={closeModal}
        isOpen={isOpen}
        onReject={handleReject}
        onConfirm={handleConfirm}
      >
        {selectedHour?.isLong ? (
          <TextTitle textAlign="right" color="text.dark" fontFamily="YekanBold">
            زمان خدمات مورد نظر شما نسبتا طولانیست و ممکن است مورد تایید آرایشگر قرار نگیرد.میخواهید
            ادامه دهید؟
          </TextTitle>
        ) : (
          <TextTitle textAlign="right" color="text.dark" fontFamily="YekanBold">
            ساعت انتخاب شده در زمان استراحت آرایشگر مورد نظر است و ممکن است توسط ایشان تایید نشود،
            مایل به ادامه هستید؟
          </TextTitle>
        )}
      </ConfirmationModal>
    </Container>
  );
};

export default Reservation;
