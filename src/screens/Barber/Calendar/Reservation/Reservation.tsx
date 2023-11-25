import {
  Button,
  Card,
  Checkbox,
  Column,
  ConfirmationModal,
  Container,
  Input,
  RowBetween,
  TextNormal,
  TextTiny,
  TextTitle,
} from "@components";
import { useAuth, useBarberNavigator, useModal, useToast } from "@hooks";
import { useRequestAppointmentMutation } from "@state/api/appointment";
import { useGetBarberFreeTimesMutation } from "@state/api/shared";
import { ServiceType } from "@types";
import { price } from "@utils";
import { ScrollView, Text } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import DateSection from "./components/DateSection";
import HourSection, { Hour } from "./components/HourSection";
import ServiceSection from "./components/ServiceSection";

const Reservation = () => {
  const { showError } = useToast();
  const { user } = useAuth();
  const { navigateToAppt } = useBarberNavigator();

  const [
    getBarberFreeTimes,
    { isLoading: GET_HOURS_LOADING, isError: GET_HOURS_ERROR, data: FREE_HOURS },
  ] = useGetBarberFreeTimesMutation();
  const [
    setAppointment,
    {
      isLoading: SET_APP_LOADING,
      isError: SET_APP_ERROR,
      error: SET_APPT_ERROR_MSG,
      isSuccess: SET_APP_SUCCESS,
      data: SET_APP,
    },
  ] = useRequestAppointmentMutation();

  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>();
  const [selectedHour, setSelectedHour] = useState<Hour>();
  const [canSelectHour, setCanselectHour] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAutoTime, setIsAutoTime] = useState(true);

  const { openModal, isOpen, closeModal } = useModal();

  const handleTimeSetChange = useCallback(() => {
    setSelectedDay(undefined);
    setCanselectHour(false);
    setIsAutoTime(!isAutoTime);
  }, [isAutoTime]);

  const anyServiceSelected = selectedServices?.length > 0;
  useEffect(() => {
    if (SET_APP_ERROR) {
      //@ts-ignore
      showError(SET_APPT_ERROR_MSG.data.error);
    }
    if (SET_APP_SUCCESS && SET_APP) {
      navigateToAppt(SET_APP._id, { replace: true });
    }
  }, [SET_APP_ERROR, SET_APP_SUCCESS]);

  const discounts = () => {
    let activeDiscounts = user?.discounts?.filter((dis) => dis.isActive);
    let discountSum;

    if (!activeDiscounts || activeDiscounts.length < 1) {
      discountSum = 0;
    } else {
      discountSum =
        activeDiscounts.reduce((acc, curr) => acc + curr.percent, 0) >= 100
          ? 100
          : activeDiscounts.reduce((acc, curr) => acc + curr.percent, 0);
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
      setCanselectHour(true);

      getBarberFreeTimes({
        barberId: user._id,
        selectedDayUnix: selectedDay,
        serviceTime: selectedServices.reduce((acc, curr) => acc + curr.time, 0),
        isManual: !isAutoTime,
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
    handleReservation();
  };

  const handleConfirm = useCallback(() => {
    closeModal();
    handleReservation();
  }, [selectedHour]);

  const handleReject = useCallback(() => {
    closeModal();
  }, [selectedHour]);

  const handleReservation = () => {
    const regex = RegExp("09(0[1-9]|1[0-9]|3[0-9]|2[1-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}");
    if (name.length < 2) {
      showError("نام وارد شده نامعتبر است");
    } else if (!regex.test(phone) || phone.trim().length !== 11) {
      showError("شماره موبایل نامعتبر است");
    } else {
      if (selectedDay && selectedHour && anyServiceSelected) {
        const data = {
          guest: { name, phone },
          status: "approved",
          barber: user._id,
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
    }
  };

  return (
    <Container
      px={2}
      headerRightElement={
        <Column>
          <TextTitle>{`رزرو نوبت در ${user.shopName}`}</TextTitle>
          <TextNormal>{user.name}</TextNormal>
        </Column>
      }
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Column space={2} pb={2}>
          <Card transparent>
            <Column space={2}>
              <Input
                label="نام مشتری را وارد کنید"
                placeholder="علی ..."
                value={name}
                onChangeText={(t) => setName(t)}
              />
              <Input
                keyboardType="numeric"
                label="شماره تماس مشتری"
                placeholder="0913"
                value={phone}
                maxLength={11}
                onChangeText={(t) => setPhone(t)}
              />
            </Column>
          </Card>
          <ServiceSection
            services={user.services}
            selected={selectedServices}
            onChangeService={handleServiceChange}
          />

          <Card transparent>
            <RowBetween borderWidth={0.5} borderRadius={5} borderColor="border.sharp" px={5}>
              <Checkbox active={!isAutoTime} onToggle={handleTimeSetChange} title="زمان شخصی" />
              <Checkbox active={isAutoTime} onToggle={handleTimeSetChange} title="زمان های آزاد" />
            </RowBetween>
          </Card>

          <DateSection
            length={20}
            barberWorkTime={isAutoTime ? user.workTime : undefined}
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
        borderTopWidth={1}
        borderTopColor="dash"
        background="primary"
        px={3}
        py={3}
      >
        <Column>
          <TextNormal color="text.secondary">{`${price(calculatedPrice)} تومان`}</TextNormal>
          {user?.discounts && user?.discounts.filter((item) => item.isActive).length > 0 && (
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
          <Text textAlign="right" color="text.dark" fontFamily="YekanBold" fontSize="lg">
            زمان خدمات مورد نظر شما نسبتا طولانیست و ممکن است مورد تایید آرایشگر قرار نگیرد.میخواهید
            ادامه دهید؟
          </Text>
        ) : (
          <Text textAlign="right" color="text.dark" fontFamily="YekanBold" fontSize="lg">
            ساعت انتخاب شده در زمان استراحت آرایشگر مورد نظر است و ممکن است توسط ایشان تایید نشود،
            مایل به ادامه هستید؟
          </Text>
        )}
      </ConfirmationModal>
    </Container>
  );
};

export default Reservation;
