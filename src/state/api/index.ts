import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

const { getItem: getItemAsync } = createSecureStore();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    let token = Platform.OS === "web" ? localStorage.getItem("token") : await getItemAsync("token");
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const Api = createApi({
  reducerPath: "splitApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "Appointments",
    "Messages",
    "Reviews",
    "ClientSamples",
    "Pending",
    "Schedule",
    "Services",
    "Samples",
    "Medals",
    "Clients",
  ],
});

export default Api;
