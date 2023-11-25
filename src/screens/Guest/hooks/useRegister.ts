import { useAuth, useToast } from "@hooks";
import { RegisterScreenRouteProp } from "@navigation/types";
import { useRoute } from "@react-navigation/core";
import { RegisterFormInterface, useRegisterMutation } from "@state/api/auth";
import { BarberInterface } from "@types";
import { useCallback, useEffect, useState } from "react";

const useRegister = () => {
  const { authenticate } = useAuth();
  const { params } = useRoute<RegisterScreenRouteProp>();
  const { phone } = params;
  const { showError } = useToast();

  const [formData, setFormData] = useState<RegisterFormInterface>({
    phone,
    name: "",
    enteredCode: "",
    barberId: process.env.EXPO_PUBLIC_APP_ID,
  });

  const { enteredCode, name, barberId } = formData;

  const [register, { isLoading, isError, isSuccess, data, error }] = useRegisterMutation();

  const handleInputChange = useCallback((item: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [item]: value }));
  }, []);

  const handleBarberChange = useCallback((item: Partial<BarberInterface>) => {
    setFormData((prev) => ({ ...prev, barberId: item._id }));
  }, []);

  async function handleRegister() {
    if (name.length < 3 || name.length > 20) {
      showError("نام وارد شده نامعتبر است");
    } else {
      register({ phone, name, enteredCode, barberId });
    }
  }

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      showError(error.data.error);
    }
    if (isSuccess && data) {
      authenticate(data);
    }
  }, [isError, isSuccess]);

  return {
    handleRegister,
    handleInputChange,
    formData,
    token: data?.token,
    isLoading,
    handleBarberChange,
  };
};

export default useRegister;
