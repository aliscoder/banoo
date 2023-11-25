import { Error } from "@components";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Box, Center, NativeBaseProvider, StatusBar, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import FlashMessage from "react-native-flash-message";
import { useAuth, useShop } from "./src/hooks";
import AppNavigator from "./src/navigation/AppNavigator";

const Entrance = () => {
  const { theme, checkInitailAuth } = useAuth();
  const [isAppReady, setAppReady] = useState(false);
  const { isError: shopLoadError, isSuccess: shopLoaded } = useShop();
  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  useEffect(() => {
    checkInitailAuth(() => {
      if (shopLoaded || shopLoadError) {
        setAppReady(true);
      }
    });
  }, [shopLoaded, shopLoadError]);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primary,
    },
  };

  return (
    <NativeBaseProvider theme={theme}>
      {!isAppReady ? null : shopLoadError ? (
        <Error />
      ) : (
        <>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={
              process.env.EXPO_PUBLIC_APP_TYPE === "MALE" ? "light-content" : "light-content"
            }
          />

          <FlashMessage position="top" statusBarHeight={5} />
          <Box flex={1} background="primary" onLayout={onLayoutRootView}>
            <NavigationContainer theme={MyTheme}>
              {Platform.OS === "web" ? (
                <Center flex={1} w="full">
                  <View w="full" maxW={600} h="full">
                    <AppNavigator />
                  </View>
                </Center>
              ) : (
                <AppNavigator />
              )}
            </NavigationContainer>
          </Box>
        </>
      )}
    </NativeBaseProvider>
  );
};

export default Entrance;
