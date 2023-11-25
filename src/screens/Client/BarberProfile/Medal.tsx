import { Error, Image as FastImage, Loading, Modal } from "@components";
import { useModal } from "@hooks";
import { useGetBarberMedalsQuery } from "@state/api/client";
import { Image } from "expo-image";
import { Flex, Pressable, ScrollView, View, useTheme } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
  id: string;
}
const Medal: React.FC<Props> = ({ id }) => {
  const { isLoading, isError, data: medals } = useGetBarberMedalsQuery(id);
  const { isOpen, closeModal, openModal, modalImage, showFullImage } = useModal();

  const theme = useTheme();

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

  return isLoading ? (
    <Loading />
  ) : isError || !medals ? (
    <Error />
  ) : (
    <View py={3} h="full" w="full">
      <ScrollView showsVerticalScrollIndicator={false}>{rows}</ScrollView>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Flex justifyContent="center" alignItems="center">
          <FastImage border radius={20} size={350} uri={modalImage} />
        </Flex>
      </Modal>
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
    width: "100%",
  },
});

export default Medal;
