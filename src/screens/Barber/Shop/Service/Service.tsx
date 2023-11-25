import {
  Button,
  Card,
  Column,
  Container,
  Input,
  List,
  Row,
  RowBetween,
  Select,
  TextTitle,
  Touch,
} from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useToast } from "@hooks";
import { useAddOrEditShopServiceMutation, useDeleteShopServiceMutation } from "@state/api/barber";
import { useGetBarberServicesQuery } from "@state/api/client";
import { useFormik } from "formik";
import { isEqual } from "lodash";
import { Icon, ScrollView, Spinner, Text } from "native-base";
import React, { memo, useEffect, useState } from "react";

const Service = () => {
  const { user } = useAuth();
  const {
    isLoading: getServicesLoading,
    isError: getServicesError,
    data: services,
    refetch,
  } = useGetBarberServicesQuery(user._id);
  const { showError, showSuccess } = useToast();
  const [editable, setEditable] = useState(false);
  const [loadingId, setLoadingId] = useState<string>();
  const [addService, { isLoading, isError, isSuccess }] = useAddOrEditShopServiceMutation();
  const [
    deleteService,
    { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteShopServiceMutation();

  const { values, handleChange, handleSubmit, setValues, resetForm } = useFormik({
    initialValues: {
      name: "",
      price: 50000,
      time: 60,
      description: "",
    },
    onSubmit: (data) => addService({ service: data, barberId: user._id }),
  });

  useEffect(() => {
    if (isError) {
      showError("خطا در برقراری ارتباط");
    }
    if (isSuccess) {
      resetForm();
      setEditable(false);
      showSuccess("اطلاعات بروزرسانی شد");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (deleteError) {
      showError("خطا در برقراری ارتباط");
    }
    if (deleteSuccess) {
      showSuccess("سرویس مورد نظر حذف شد");
    }
  }, [deleteSuccess, deleteError]);

  const handleComplete = () => {
    if (values.name.length < 3 || values.name.length > 20) {
      showError("نام وارد شده نامعتبر است");
    } else if (Number(values.price) < 1000) {
      showError("هزینه سرویس وارد شده نامعتبر است");
    } else if (Number(values.time) < 1) {
      showError("زمان وارد شده نامعتبر است");
    } else {
      handleSubmit();
    }
  };

  return (
    <Container headerTitle="مدیریت سرویس ها">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          transparent
          header={
            editable && (
              <RowBetween my={2}>
                <Touch
                  onPress={() => {
                    resetForm();
                    setEditable(false);
                  }}
                >
                  <Row space={1}>
                    <Text color="danger">لغو ویرایش</Text>
                    <Icon as={Ionicons} name="close" color="danger" />
                  </Row>
                </Touch>
                <TextTitle color="secondary">{`بروزرسانی سرویس : ${values.name}`}</TextTitle>
              </RowBetween>
            )
          }
          showTitle={!editable}
          title="مشخصات سرویس جدید"
        >
          <Column space={4}>
            <Input
              icon="clipboard-outline"
              label="نام سرویس مورد نظر"
              placeholder="مثال : کوتاه کردن معمولی ، مدل دامادی و ..."
              value={values.name}
              onChangeText={handleChange("name")}
            />
            <Input
              icon="card-outline"
              label="هزینه سرویس (به تومان)"
              keyboardType="numeric"
              value={values.price.toString()}
              onChangeText={handleChange("price")}
            />
            <Select
              label="مدت زمان سرویس (به دقیقه)"
              data={[30, 60, 90, 120, 180, 240]}
              onChange={(t) => setValues({ ...values, time: t })}
              extraTitle="دقیقه"
            />
            <Input
              multiline
              icon="list"
              label="توضیحات (اختیاری)"
              placeholder="توضیحات مورد نظر راجع به سرویس"
              value={values.description}
              onChangeText={handleChange("description")}
            />
          </Column>
          <Button
            isLoading={isLoading}
            my={8}
            title={editable ? "بروزرسانی سرویس" : "افزودن سرویس"}
            onPress={handleComplete}
            scheme="success"
          />
        </Card>

        <Card title="سرویس های شما" my={3} flex={1}>
          <List
            isLoading={getServicesLoading}
            isError={getServicesError}
            data={services}
            renderItem={({ item, index }) => (
              <RowBetween mt={index !== 0 ? 8 : 0}>
                <Row space={6}>
                  {deleteLoading && loadingId === item._id ? (
                    <Spinner />
                  ) : (
                    <Touch
                      onPress={() => {
                        setLoadingId(item._id);
                        deleteService({ barberId: user._id, serviceId: item._id! });
                      }}
                    >
                      <Icon as={Ionicons} name="trash-bin-sharp" color="text.muted" />
                    </Touch>
                  )}

                  <Touch
                    onPress={() => {
                      setValues({ ...item });
                      setEditable(true);
                    }}
                  >
                    <Icon as={Ionicons} name="pencil" color="success" />
                  </Touch>
                </Row>
                <TextTitle>{item.name}</TextTitle>
              </RowBetween>
            )}
          />
        </Card>
      </ScrollView>
    </Container>
  );
};

export default memo(Service, isEqual);
