import {
  Button,
  Card,
  Column,
  ConfirmationModal,
  Container,
  Input,
  List,
  RowBetween,
  TextTitle,
  Touch,
} from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useModal, useToast } from "@hooks";
import { useAddCoworkerMutation, useDeleteCoworkerMutation } from "@state/api/barber";
import { useFormik } from "formik";
import { Icon, ScrollView, Spinner } from "native-base";
import React, { useEffect, useState } from "react";

const Coworker = () => {
  const [addCoworker, { isLoading, isError, isSuccess }] = useAddCoworkerMutation();
  const [
    deleteCoworker,
    { isLoading: deleteLoading, isError: deleteError, isSuccess: deleteSuccess },
  ] = useDeleteCoworkerMutation();
  const { showError, showSuccess } = useToast();
  const { user } = useAuth();
  const [loadingId, setLoadingId] = useState<string>();
  const [selectedId, setSelectedId] = useState<string>();

  const { closeModal, isOpen, openModal } = useModal();
  const { values, handleChange, handleSubmit, resetForm, setValues } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
      repassword: "",
    },
    onSubmit: (data) =>
      addCoworker({
        barberId: user._id,
        name: data.name,
        phone: data.phone,
        password: data.password,
      }),
  });

  const handleComplete = () => {
    const regex = RegExp("09(0[1-9]|1[0-9]|3[0-9]|2[1-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}");
    if (!regex.test(values.phone) || values.phone.trim().length !== 11) {
      showError("شماره موبایل نامعتبر است");
    } else if (values.password !== values.repassword || values.password.length < 6) {
      showError("کلمه عبور با تکرار مطابقت ندارد یا نامعتبر است");
    } else if (values.name.length < 3) {
      showError("نام وارد شده نامعتبر است");
    } else {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (isError) {
      showError("خطا در برقراری ارتباط");
    }
    if (isSuccess) {
      resetForm();
      setSelectedId(undefined);
      setLoadingId(undefined);
      showSuccess("اطلاعات بروزرسانی شد");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (deleteError) {
      showError("خطا در برقراری ارتباط");
    }
    if (deleteSuccess) {
      showSuccess("همکار مورد نظر حذف شد");
    }
  }, [deleteSuccess, deleteError]);

  function openConfirm(id: string) {
    setSelectedId(id);
    openModal();
  }

  return (
    <Container headerTitle="مدیریت همکاران">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card transparent title="مشخصات همکار">
          <Column space={4}>
            <Input
              icon="person-outline"
              label="نام همکار"
              placeholder="نام همکار شما"
              value={values.name}
              onChangeText={handleChange("name")}
            />
            <Input
              icon="call-outline"
              label="شماره موبایل"
              placeholder="0913 ..."
              maxLength={11}
              keyboardType="numeric"
              value={values.phone}
              onChangeText={handleChange("phone")}
            />
            <Input
              icon="key-outline"
              label="کلمه عبور"
              secureTextEntry
              placeholder="کلمه عبور ایمن"
              value={values.password}
              onChangeText={handleChange("password")}
            />
            <Input
              icon="key-outline"
              label="تکرار کلمه عبور"
              secureTextEntry
              placeholder="کلمه عبور ایمن"
              value={values.repassword}
              onChangeText={handleChange("repassword")}
            />
          </Column>
          <Button
            isLoading={isLoading}
            my={8}
            title="افزودن همکار"
            onPress={handleComplete}
            scheme="success"
          />
        </Card>

        {user.coWorkers && user.coWorkers?.length > 0 && (
          <Card title="همکاران شما" my={3} flex={1}>
            <List
              data={user.coWorkers}
              renderItem={({ item, index }) => (
                <RowBetween mt={index !== 0 ? 8 : 0}>
                  {loadingId === item._id && deleteLoading ? (
                    <Spinner />
                  ) : (
                    <Touch onPress={() => openConfirm(item._id!)}>
                      <Icon as={Ionicons} name="trash-bin-sharp" color="danger" />
                    </Touch>
                  )}

                  <TextTitle>{item.name}</TextTitle>
                </RowBetween>
              )}
            />
          </Card>
        )}
      </ScrollView>

      <ConfirmationModal
        onClose={closeModal}
        isOpen={isOpen}
        onReject={closeModal}
        onConfirm={() => {
          setLoadingId(selectedId);
          closeModal();
          deleteCoworker({ barberId: user._id, coId: selectedId! });
        }}
      >
        <TextTitle textAlign="right" color="text.dark" fontFamily="YekanBold">
          در صورت حذف همکار تمام اطلاعات و سوابق کاری او حذف خواهد شد، آیا مطمئن هستید؟
        </TextTitle>
      </ConfirmationModal>
    </Container>
  );
};

export default Coworker;

// onPress={() => {
//   setLoadingId(item._id);
//   deleteCoworker({ barberId: user._id, coId: item._id });
// }}
