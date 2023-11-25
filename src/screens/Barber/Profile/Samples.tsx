import { Error, Image as FastImage, Loading, Modal, Touch } from "@components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth, useImagePicker, useModal } from "@hooks";
import { useGetBarberSamplesQuery } from "@state/api/client";
import { useAddSampleMutation, useDeleteSampleMutation } from "@state/api/shared";
import { Image } from "expo-image";
import { Fab, Flex, Icon, Pressable, ScrollView, Spinner, View } from "native-base";
import React, { FC, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";

interface Props {
  id: string;
}

const Samples: FC<Props> = ({ id }) => {
  const { user } = useAuth();
  const { isLoading, isError, data: samples } = useGetBarberSamplesQuery(id);
  const { isOpen, closeModal, openModal, modalImage, showFullImage } = useModal();
  const { pickImage, image: sample, clearImageInput } = useImagePicker();

  const rows = [];
  const imagesPerRow = 2;

  for (let i = 0; i < (samples ? samples.length : 0); i += imagesPerRow) {
    const rowImages = samples?.slice(i, i + imagesPerRow);

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
  const [addSample, { isLoading: addSampleLoading, isError: addSampleError }] =
    useAddSampleMutation();

  const [deleteSample, { isLoading: deleteSampleLoading }] = useDeleteSampleMutation();
  const sampleData = {
    userId: user._id,
    sample,
  };
  useEffect(() => {
    if (sample) {
      addSample(sampleData).then(() => {
        clearImageInput();
      });
    }
  }, [sample]);

  const handleDelete = useCallback(() => {
    deleteSample({ userId: user._id, sampleUrl: modalImage }).then(() => closeModal());
  }, [modalImage]);

  return isLoading ? (
    <Loading />
  ) : isError || !samples ? (
    <Error />
  ) : (
    <View py={2} h="full" w="full">
      <ScrollView showsVerticalScrollIndicator={false}>{rows}</ScrollView>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Flex justifyContent="center" alignItems="center">
          <FastImage border radius={20} size={350} uri={modalImage} />
          <Touch style={{ marginTop: 9 }} onPress={handleDelete}>
            {deleteSampleLoading ? (
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
          addSampleLoading ? (
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
    aspectRatio: 0.8,
    borderRadius: 5,
  },
});

export default Samples;
