import { ShopSteps } from "@screens/Barber/utils";
import useAuth from "./useAuth";

const useSteps = () => {
  const { user } = useAuth();
  const STEPS = user.isCoworker
    ? ShopSteps.filter((item) => item.id !== 1 && item.id !== 6)
    : ShopSteps;

  return STEPS;
};

export default useSteps;
