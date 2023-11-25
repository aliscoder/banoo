import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { useState } from "react";
import useToast from "./useToast";

const useImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const { showError } = useToast();

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      selectionLimit: 1,
      quality: 0.7,
      base64: true,
    });

    if (result && !result.canceled) {
      const photo = result.assets[0].base64;
      if (photo) {
        const photoSize = (photo.length * 0.75) / (1024 * 1024);

        if (photoSize > 0.5) {
          showError("حجم تصویر زیاد است");
        } else {
          setImage(photo as string);
        }
      } else {
        return;
      }
    }
  };

  const clearImageInput = () => {
    setImage(null);
  };

  return { image, clearImageInput, pickImage };
};

export default useImagePicker;
