import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";
import usePlatform from "./usePlatform";

const {
  getItem: getItemAsync,
  setItem: setItemAsync,
  removeItem: deleteItemAsync,
} = createSecureStore();

const useStorage = () => {
  const { isWeb } = usePlatform();

  async function getItem(key: string) {
    return isWeb ? localStorage.getItem(key) : await getItemAsync(key);
  }

  async function setItem(key: string, value: string) {
    return isWeb ? localStorage.setItem(key, value) : await setItemAsync(key, value);
  }

  async function deleteItem(key: string) {
    return isWeb ? localStorage.removeItem(key) : await deleteItemAsync(key);
  }

  return { getItem, setItem, deleteItem, isWeb };
};

export default useStorage;
