import { Button, Column, Container, Input, Select } from "@components";
import { useShop } from "@hooks";
import React from "react";
import BaseImage from "./components/GuestBackgroundImage";
import useRegister from "./hooks/useRegister";
import useSendCodeAgain from "./hooks/useSendCodeAgain";

const Register = () => {
  const { handleInputChange, handleBarberChange, isLoading, formData, handleRegister } =
    useRegister();
  const { sendCodeAgain, isLoading: againLoading, timer } = useSendCodeAgain();
  const shop = useShop();

  return (
    <Container bodyPadded={false} isInSafeArea pt={2}>
      <Column space={3} p={3}>
        <Input
          onChangeText={(text) => handleInputChange("enteredCode", text)}
          keyboardType="numeric"
          value={formData.enteredCode?.toLocaleString()}
          maxLength={8}
          label="کد پیامک شده را وارد کنید"
          placeholder="13456"
        />
        <Input
          onChangeText={(text) => handleInputChange("name", text)}
          label="نام خود را وارد کنید"
          placeholder="حسین خادمی"
        />
        {shop?.coWorkers && shop?.coWorkers.length > 0 && (
          <Select
            onChange={handleBarberChange}
            data={[shop, ...shop?.coWorkers]}
            label="آرایشگر مورد نظر را انتخاب کنید"
            selectLabel="name"
          />
        )}
        <Button scheme="success" isLoading={isLoading} onPress={handleRegister} title="ثبت نام" />

        <Button
          isLoading={againLoading}
          onPress={() => sendCodeAgain(formData.phone)}
          scheme="warning"
          isDisabled={timer > 0}
          title={timer > 0 ? `${timer} ثانیه صبر کنید` : "ارسال دوباره کد"}
        />
      </Column>
      <BaseImage height={450} />
    </Container>
  );
};

export default Register;
