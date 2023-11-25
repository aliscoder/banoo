import {
  Button,
  Card,
  Checkbox,
  Column,
  Container,
  EditMap,
  Input,
  LocationActivator,
  Row,
  RowBetween,
} from "@components";
import { useAuth, useBarberNavigator, useLocation, useToast } from "@hooks";
import { useCompleteShopDetailsMutation } from "@state/api/barber";
import { findAddress, findCoords } from "@utils";
import { useFormik } from "formik";
import { isEqual } from "lodash";
import { ScrollView } from "native-base";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { MapPressEvent } from "react-native-maps";

const Location = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const [addressType, setAddressType] = useState("manual");
  const { lastLocation, updatedLocation, changeLocation } = useLocation();

  const { navigateInShop } = useBarberNavigator();
  const [completeDetails, { isLoading, isError, isSuccess }] = useCompleteShopDetailsMutation();

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: {
      shopName: user.shopName || "",
      name: user.name || "",
      address: user.address || "",
      instagram: user.instagram || "",
      website: user.website || "",
    },
    onSubmit: async (data) => {
      let location;
      if (updatedLocation) {
        location = { type: "Point", coordinates: [updatedLocation[0], updatedLocation[1]] };
      } else if (values.address && !lastLocation && !updatedLocation) {
        let curr = await findCoords(values.address);
        location = { type: "Point", coordinates: [curr[0], curr[1]] };
      } else {
        location = user.location;
      }
      completeDetails({
        ...data,
        _id: user._id,
        location,
      });
    },
  });

  useEffect(() => {
    if (isError) {
      showError("خطا در برقراری ارتباط");
    }
    if (isSuccess) {
      navigateInShop({ screen: "Entry" });
    }
  }, [isSuccess, isError]);

  const handleComplete = () => {
    if (values.shopName.length < 3 || values.shopName.length > 100) {
      showError("نام آرایشگاه وارد شده نامعتبر است");
    } else if (values.name.length < 3 || values.name.length > 100) {
      showError("نام وارد شده نامعتبر است");
    } else if (values.address.length < 3 || values.address.length > 100) {
      showError("آدرس وارد شده نامعتبر است");
    } else {
      handleSubmit();
    }
  };

  const setAddress = async (e: MapPressEvent) => {
    changeLocation([e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude]);
    const address = await findAddress([
      e.nativeEvent.coordinate.longitude,
      e.nativeEvent.coordinate.latitude,
    ]);
    setValues({ ...values, address });
  };

  const changeAddressType = useCallback(() => {
    if (addressType === "manual") {
      setAddressType("map");
    } else {
      setAddressType("manual");
    }
  }, [addressType]);

  return (
    <Container headerTitle="آدرس آرایشگاه">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card transparent>
          <Column space={4}>
            <Input
              icon="book-outline"
              label="نام آرایشگاه را وارد کنید"
              value={values.shopName}
              onChangeText={handleChange("shopName")}
            />

            <Input
              icon="person-outline"
              label="نام آرایشگر چیست؟"
              value={values.name}
              onChangeText={handleChange("name")}
            />

            <Input
              icon="logo-instagram"
              label="آی دی اینستاگرام"
              value={values.instagram}
              onChangeText={handleChange("instagram")}
            />

            <Input
              icon="globe"
              label="وبسایت"
              value={values.website}
              onChangeText={handleChange("website")}
            />

            {Platform.OS !== "web" && lastLocation && (
              <RowBetween borderWidth={0.5} borderRadius={5} borderColor="border.sharp" px={5}>
                <Checkbox
                  active={addressType === "map"}
                  onToggle={changeAddressType}
                  title="یافتن از روی نقشه"
                />
                <Checkbox
                  active={addressType === "manual"}
                  onToggle={changeAddressType}
                  title="ثبت دستی آدرس"
                />
              </RowBetween>
            )}

            {addressType === "map" ? (
              <EditMap onChangeLocation={setAddress} height={250} />
            ) : (
              <Column space={2}>
                <Input
                  icon="location-outline"
                  label="آدرس دستی وارد کنید"
                  value={values.address}
                  onChangeText={handleChange("address")}
                />
                {!lastLocation && Platform.OS !== "web" && <LocationActivator />}
              </Column>
            )}

            {/* <Button
              isLoading={isLoading}
              title="بروز رسانی"
              onPress={handleComplete}
              scheme="success"
            /> */}
          </Column>
        </Card>
      </ScrollView>
      <Row
        justifyContent="flex-end"
        width="100%"
        borderTopWidth={1}
        borderTopColor="dash"
        background="primary"
        px={3}
        py={3}
      >
        <Button
          isLoading={isLoading}
          title="بروز رسانی"
          onPress={handleComplete}
          scheme="success"
          w="1/3"
          p={1.5}
        />
      </Row>
    </Container>
  );
};

export default memo(Location, isEqual);
