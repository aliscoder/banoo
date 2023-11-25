import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetUserNotifsQuery } from "@state/api/notif";
import { Box, Icon, Text, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import React from "react";
import { useAuth, useBarberNavigator } from "../../hooks";
import Badge from "../Badge/Badge";
import { Error, Loading } from "../List/List";
import { Row, RowBetween } from "../Row/Row";
import Touch from "../Touch/Touch";
interface ContainerProps extends IViewProps {
  children?: React.ReactNode;
  hasHeader?: boolean;
  isInSafeArea?: boolean | number;
  headerComponent?: React.ReactNode;
  hasAvatar?: boolean;
  headerLeftElement?: React.ReactNode;
  headerRightElement?: React.ReactNode;
  rightIconComponent?: React.ReactNode;
  bottomPadded?: boolean;
  headerTitle?: string;
  isLoading?: boolean;
  isError?: boolean;
  bodyPadded?: boolean;
}

const Header: React.FC<Partial<ContainerProps>> = ({
  headerRightElement,
  headerLeftElement,
  rightIconComponent,
  headerTitle,
}) => {
  const { goBack, canGoBack, navigate } = useNavigation();
  const { navigateToNotification } = useBarberNavigator();
  const route = useRoute();

  const { user } = useAuth();
  const { data: notifs } = useGetUserNotifsQuery(user._id);

  const unreadNotifCount = notifs
    ? notifs?.filter(
        (notif) => notif.recievers.find((reciever) => reciever.userId === user._id)?.seen
      ).length
    : 0;

  return (
    <RowBetween height={12} px={4} my={2}>
      {canGoBack() && route.name !== "Home" && !headerLeftElement ? (
        <Touch onPress={goBack}>
          <Icon size="lg" name="arrow-left" as={SimpleLineIcons} color="text.muted" />
        </Touch>
      ) : (
        headerLeftElement
      )}
      <Row space={6} justifyContent="flex-end">
        {headerTitle ? (
          <Text mr={2} fontSize={20} color="text.muted">
            {headerTitle}
          </Text>
        ) : (
          headerRightElement || (
            <Row space={3}>
              {rightIconComponent}
              <Touch onPress={navigateToNotification}>
                <View position="relative">
                  {unreadNotifCount > 0 && <Badge sum={unreadNotifCount} />}
                  <Icon as={SimpleLineIcons} name="bell" size="lg" color="text.muted" />
                </View>
              </Touch>
            </Row>
          )
        )}
      </Row>
    </RowBetween>
  );
};

const Container: React.FC<ContainerProps> = ({
  children,
  hasHeader = true,
  headerComponent,
  bottomPadded = false,
  headerRightElement,
  headerLeftElement,
  isInSafeArea = true,
  headerTitle,
  isLoading,
  isError,
  rightIconComponent,
  bodyPadded = true,
  ...rest
}) => {
  const { user } = useAuth();

  const { navigate } = useNavigation();
  const route = useRoute();

  return (
    <Box background="primary" pb={bottomPadded ? 20 : 0} safeArea={isInSafeArea} flex={1}>
      {user &&
        hasHeader &&
        (headerComponent ? (
          headerComponent
        ) : (
          <Header
            headerTitle={headerTitle}
            headerLeftElement={headerLeftElement}
            headerRightElement={headerRightElement}
            rightIconComponent={rightIconComponent}
          />
        ))}
      <View flex={1} px={bodyPadded ? 2 : 0} {...rest}>
        {isLoading ? <Loading /> : isError ? <Error /> : children}
      </View>
    </Box>
  );
};

export default Container;
