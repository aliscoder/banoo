import { useAuth, useLocation } from "@hooks";
import { Pressable, View } from "native-base";
import React, { useCallback } from "react";
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Linking } from "react-native";
import { Column } from "../Column/Column";
import { TextMuted, TextNormal, TextTitle } from "../Text/Text";
import { CoordType } from "@types";

type Props = {
  viewOnly?: boolean;
  coords: CoordType;
  pointerTitle?: string;
  pointerDesc?: string;
  height?: number;
  title?: string;
  address?: string;
  onChangeLocation?: (e: MapPressEvent) => void;
};

const Map = ({
  viewOnly = false,
  coords,
  pointerDesc,
  pointerTitle,
  height = 400,
  title,
  address,
  onChangeLocation,
}: Props) => {
  const { user, isBarber } = useAuth();
  const { lastLocation } = useLocation();

  const longitude = viewOnly && isBarber ? user?.location?.coordinates[0] : coords[0];
  const latitude = viewOnly && isBarber ? user?.location?.coordinates[1] : coords[1];

  const goToMap = useCallback(async () => {
    if (lastLocation && viewOnly) {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&origin=${lastLocation[1]},${lastLocation[0]}&destination=${coords[1]},${coords[0]}`
      );
    }
  }, [lastLocation]);

  return (
    <Pressable onPress={goToMap}>
      <Column space={2}>
        {title && <TextNormal color="text.muted">{title}</TextNormal>}
        {address && <TextNormal color="text.muted">{address}</TextNormal>}
        <View borderWidth={0.5} borderColor="border.muted" borderRadius={5} overflow="hidden">
          <MapView
            showsUserLocation
            scrollEnabled={!viewOnly}
            onPress={onChangeLocation}
            zoomEnabled={!viewOnly}
            zoomTapEnabled={!viewOnly}
            initialRegion={{
              longitude: longitude,
              latitude: latitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
            provider={PROVIDER_GOOGLE}
            style={{ width: "100%", height }}
          >
            <Marker
              coordinate={{
                longitude: longitude,
                latitude: latitude,
              }}
              title={pointerTitle}
              description={pointerDesc}
            />
          </MapView>
        </View>
      </Column>
    </Pressable>
  );
};

export default Map;
