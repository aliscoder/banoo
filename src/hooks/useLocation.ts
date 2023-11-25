import { resetUpdatedLocation, setLocation, updateLocation } from "@state/reducers/locationReducer";
import { CoordType } from "@types";
import { getLastKnownPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

const useLocation = () => {
  const { lastLocation, updatedLocation } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const changeLocation = useCallback((coords: CoordType) => {
    dispatch(updateLocation(coords));
  }, []);

  const resetLocation = useCallback(() => {
    dispatch(resetUpdatedLocation());
  }, []);

  useEffect(() => {
    if (lastLocation) {
      return;
    } else {
      (async () => {
        const { granted } = await requestForegroundPermissionsAsync();

        if (!granted) {
          return;
        }
        const location = await getLastKnownPositionAsync();

        if (location) {
          dispatch(setLocation([location.coords.longitude, location.coords.latitude]));
        }
      })();
    }
  }, [lastLocation]);

  return { lastLocation, updatedLocation, changeLocation, resetLocation };
};

export default useLocation;
