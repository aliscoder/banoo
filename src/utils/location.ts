import { getLastKnownPositionAsync, requestForegroundPermissionsAsync } from "expo-location";

export const requestLocation = async () => {
    let { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        let location = await getLastKnownPositionAsync();
        if (location) {
          return [location.coords.longitude , location.coords.latitude]
        }
      }
  }