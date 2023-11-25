import { useAuth, useLocation } from "@hooks";
import { View } from "native-base";
import React from "react";
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";

type Props = {
  height?: number;
  address?: string;
  onChangeLocation?: (e: MapPressEvent) => void;
};

const EditMap = ({ height = 400, onChangeLocation }: Props) => {
  const { lastLocation, updatedLocation } = useLocation();

  const { user } = useAuth();
  return (
    <View borderWidth={0.5} borderColor="border.muted" borderRadius={5} overflow="hidden">
      <MapView
        showsUserLocation
        onPress={onChangeLocation}
        initialRegion={{
          longitude: updatedLocation
            ? updatedLocation[0]
            : user.location
            ? user.location.coordinates[0]
            : lastLocation![0],
          latitude: updatedLocation
            ? updatedLocation[1]
            : user.location
            ? user.location.coordinates[1]
            : lastLocation![1],
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height }}
      >
        <Marker
          coordinate={{
            longitude: updatedLocation
              ? updatedLocation[0]
              : user.location
              ? user.location.coordinates[0]
              : lastLocation![0],
            latitude: updatedLocation
              ? updatedLocation[1]
              : user.location
              ? user.location.coordinates[1]
              : lastLocation![1],
          }}
        />
      </MapView>
    </View>
  );
};

export default EditMap;
