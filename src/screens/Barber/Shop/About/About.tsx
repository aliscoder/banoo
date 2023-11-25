import { Avatar, Button, Column, Container, Input } from "@components";
import { useAuth, useBarberNavigator, useImagePicker, useToast } from "@hooks";
import { useUpdateShopBioMutation } from "@state/api/barber";
import { useFormik } from "formik";
import { isEqual } from "lodash";
import { View } from "native-base";
import React, { memo, useEffect } from "react";

const About = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const { navigateInShop } = useBarberNavigator();
  const [updateShopBio, { isLoading, isError, isSuccess }] = useUpdateShopBioMutation();
  const { pickImage, image: avatar } = useImagePicker();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      bio: user.bio || "",
    },
    onSubmit: (data) => updateShopBio({ bio: data.bio, avatar, barberId: user._id }),
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
    if (values.bio.length < 3 || values.bio.length > 500) {
      showError("متن بسیار کوتاه یا بسیار طولانیست");
    } else {
      handleSubmit();
    }
  };

  return (
    <Container px={2} headerTitle="درباره آرایشگاه">
      {/* <Card> */}
      <Column space={3} px={3}>
        <View alignItems="center">
          <Avatar onPress={pickImage} local={avatar} uri={user.avatar} size="2xl" my={4} />
        </View>
        <Input
          // style={{ height: 250 }}
          multiline
          minHeight={150}
          label="متنی راجع به خود و آرایشگاه بنویسید"
          value={values.bio}
          onChangeText={handleChange("bio")}
        />

        <Button
          isLoading={isLoading}
          title="بروز رسانی"
          onPress={handleComplete}
          scheme="success"
        />
      </Column>
      {/* </Card> */}
    </Container>
  );
};

export default memo(About, isEqual);
