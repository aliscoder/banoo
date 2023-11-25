import React from "react";
import { useAuth, useShop } from "../hooks";
import BarberNavigator from "./BarberNavigator";
import ClientNavigator from "./ClientNavigator";
import GuestNavigator from "./GuestNavigator";
import { Link } from "native-base";
import { Button, Column, Modal, TextNormal, TextTitle } from "@components";

const AppNavigator = () => {
  const { user, isBarber } = useAuth();
  const shop = useShop();

  return (
    <>
      {user ? isBarber ? <BarberNavigator /> : <ClientNavigator /> : <GuestNavigator />}

      {shop.isSuccess && shop?.version! !== Number(process.env.EXPO_PUBLIC_APP_VERSION) && (
        <Modal isSheet onClose={() => console.log("done")} isOpen>
          <Column space={3} p={3} pb={8} alignItems="center" justifyContent="center" h="full">
            <TextTitle>اپلیکیشن نیاز به آپدیت دارد</TextTitle>
            <TextNormal>پس از دانلود و نصب نسخه جدید میتوانید ادامه دهید</TextNormal>
            <Link href={shop?.download_link}>
              <Button scheme="success" title="دانلود نسخه جدید" />
            </Link>
          </Column>
        </Modal>
      )}
    </>
  );
};

export default AppNavigator;
