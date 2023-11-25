import { useGetShopQuery } from "@state/api/auth";

const useShop = () => {
  const { data, isLoading, isSuccess, isError } = useGetShopQuery(
    process.env.EXPO_PUBLIC_APP_ID as string
  );

  return { ...data, isLoading, isSuccess, isError };
};

export default useShop;
