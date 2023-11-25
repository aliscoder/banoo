import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";
import { Platform } from "react-native";
const {
  getItem: getItemAsync,
  setItem: setItemAsync,
  removeItem: deleteItemAsync,
} = createSecureStore();

const isWeb = Platform.OS === "web";

async function getItem(key: string) {
  return isWeb ? localStorage.getItem(key) : await getItemAsync(key);
}

async function setItem(key: string, value: string) {
  return isWeb ? localStorage.setItem(key, value) : await setItemAsync(key, value);
}

async function deleteItem(key: string) {
  return isWeb ? localStorage.removeItem(key) : await deleteItemAsync(key);
}

export { deleteItem, getItem, setItem };
