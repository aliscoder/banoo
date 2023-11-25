import { Button, Card, Column, Container, Input, List } from "@components";
import { useAuth, useToast } from "@hooks";
import { useAddDiscountMutation } from "@state/api/barber";
import { DiscountType } from "@types";
import { useFormik } from "formik";
import React, { useCallback, useEffect } from "react";
import DiscountRow from "./DiscountRow";

const Reward = () => {
  const [addDiscount, { isLoading: addLoading, isSuccess: addedSuccesfully }] =
    useAddDiscountMutation();
  const { showError, showSuccess } = useToast();
  const { user } = useAuth();

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      percent: "",
      reason: "",
    },
    onSubmit: (data) =>
      addDiscount({
        barberId: user._id,
        discount: { percent: Number(data.percent), reason: data.reason },
      }),
  });

  const handleComplete = () => {
    if (Number(values.percent) <= 0 || Number(values.percent) > 100) {
      showError("درصد وارد شده نامعتبر است");
    } else if (values.reason.length < 1) {
      showError("برای تخفیف خو دلیل را تعیین کنید");
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (addedSuccesfully) {
      showSuccess("تخفیف با موفقیت ثبت و فعال شد");
      resetForm();
    }
  }, [addedSuccesfully]);

  const renderDiscount = useCallback(({ item }: { item: DiscountType }) => {
    return <DiscountRow discount={item} />;
  }, []);

  return (
    <Container headerTitle="تخفیف">
      <Card transparent title="افزودن تخفیف">
        <Column space={4}>
          <Input
            icon="card-outline"
            keyboardType="numeric"
            label="میزان تخفیف به درصد"
            placeholder="10 و 15 و ...."
            value={values.percent}
            onChangeText={handleChange("percent")}
          />
          <Input
            icon="pricetags"
            label="دلیل تخفیف"
            placeholder="دلیل هدیه به مشتریان را وارد کنید"
            multiline
            value={values.reason}
            onChangeText={handleChange("reason")}
          />
          <Button
            isLoading={addLoading}
            my={8}
            title="ثبت تخفیف"
            onPress={handleComplete}
            scheme="success"
          />
        </Column>
      </Card>

      {user.discounts && user.discounts.length > 0 && (
        <Card title="لیست تخفیف ها" my={3} flex={1} transparent>
          <List
            data={user.discounts}
            hasSeperator
            renderItem={renderDiscount}
            keyExtractor={(item) => item._id!}
          />
        </Card>
      )}
    </Container>
  );
};

export default Reward;
