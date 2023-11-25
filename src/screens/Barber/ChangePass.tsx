import { Button, Card, Column, Container, Input } from "@components";
import { useAuth, useToast } from "@hooks";
import { useChangePassMutation } from "@state/api/auth";
import { useFormik } from "formik";
import React, { useEffect } from "react";

type Props = {};

const ChangePass = (props: Props) => {
  const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePassMutation();
  const { showError, showSuccess } = useToast();
  const { user } = useAuth();

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      current: "",
      new: "",
      reNew: "",
    },
    onSubmit: (data) =>
      changePassword({
        barberId: user._id,
        newPassword: data.new,
        currentPassword: data.current,
      }),
  });

  const handleComplete = () => {
    if (values.new!.length < 6) {
      showError("کلمه عبور وارد شده ضعیف است");
    } else if (values.new !== values.reNew) {
      showError("کلمه عبور با تکرار مطابقت ندارد");
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccess("کلمه عبور با موفقیت تغییر کرد");
      resetForm();
    }

    if (isError && error) {
      //@ts-ignore
      showError(error.data.error);
    }
  }, [isSuccess, isError]);

  return (
    <Container headerTitle="امنیت حساب کاربری">
      <Card title="تغییر کلمه عبور" transparent>
        <Column space={4}>
          <Input
            secureTextEntry
            icon="key-outline"
            label="کلمه عبور فعلی"
            value={values.current}
            onChangeText={handleChange("current")}
          />

          <Column mt={5} space={2}>
            <Input
              secureTextEntry
              icon="key-outline"
              label="کلمه عبور جدید"
              value={values.new}
              onChangeText={handleChange("new")}
            />
            <Input
              secureTextEntry
              icon="key-outline"
              label="تکرار کلمه عبور جدید"
              value={values.reNew}
              onChangeText={handleChange("reNew")}
            />
          </Column>

          <Button
            isLoading={isLoading}
            my={8}
            title="تغییر کلمه عبور"
            onPress={handleComplete}
            scheme="success"
          />
        </Column>
      </Card>
    </Container>
  );
};

export default ChangePass;
