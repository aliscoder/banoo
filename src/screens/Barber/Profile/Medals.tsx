import { Error, Image as FastImage, Loading, Modal, Touch } from "@components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useImagePicker, useModal } from "@hooks";
import { useGetBarberMedalsQuery } from "@state/api/client";
import { useAddMedalMutation, useDeleteMedalMutation } from "@state/api/shared";
import { Image } from "expo-image";
import { Fab, Flex, Icon, Pressable, ScrollView, Spinner, View } from "native-base";
import React, { FC, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";

interface Props {
  id: string;
}

const Medals: FC<Props> = ({ id }) => {
  const { user } = useAuth();
  const { isLoading, isError, data: medals } = useGetBarberMedalsQuery(id);
  const { isOpen, closeModal, openModal, modalImage, showFullImage } = useModal();
  const { pickImage, image: medal, clearImageInput } = useImagePicker();

  const rows = [];
  const imagesPerRow = 2;

  for (let i = 0; i < (medals ? medals.length : 0); i += imagesPerRow) {
    const rowImages = medals?.slice(i, i + imagesPerRow);

    const row = (
      <View key={i} style={styles.row}>
        {rowImages?.map((image, index) => (
          <Pressable key={index} onPress={() => showFullImage(image)} w="49%">
            <Image source={image} style={styles.image} />
          </Pressable>
        ))}
      </View>
    );

    rows.push(row);
  }
  const [addMedal, { isLoading: addMedalLoading, isError: addMedalError }] = useAddMedalMutation();

  const [deleteMedal, { isLoading: deleteMedalLoading }] = useDeleteMedalMutation();
  const medalData = {
    userId: user._id,
    medal,
  };
  useEffect(() => {
    if (medal) {
      addMedal(medalData).then(() => {
        clearImageInput();
      });
    }
  }, [medal]);

  const handleDelete = useCallback(() => {
    deleteMedal({ userId: user._id, medalUrl: modalImage }).then(() => closeModal());
  }, [modalImage]);

  return isLoading ? (
    <Loading />
  ) : isError || !medals ? (
    <Error />
  ) : (
    <View py={2} h="full" w="full">
      <ScrollView showsVerticalScrollIndicator={false}>{rows}</ScrollView>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Flex justifyContent="center" alignItems="center">
          <FastImage border radius={20} size={350} uri={modalImage} />
          <Touch style={{ marginTop: 9 }} onPress={handleDelete}>
            {deleteMedalLoading ? (
              <Spinner size={24} color="danger" />
            ) : (
              <Icon as={MaterialCommunityIcons} size="2xl" name="delete" color="danger" />
            )}
          </Touch>
        </Flex>
      </Modal>

      <Fab
        background="success"
        renderInPortal={false}
        shadow={5}
        size={16}
        onPress={pickImage}
        bottom={10}
        right={10}
        icon={
          addMedalLoading ? (
            <Spinner />
          ) : (
            <Icon color="text.light" as={MaterialCommunityIcons} name="plus" size="lg" />
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  image: {
    aspectRatio: 0.7,
    borderRadius: 5,
  },
});

export default Medals;
