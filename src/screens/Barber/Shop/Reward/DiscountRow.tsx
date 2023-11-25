import {
  Column,
  RowBetween,
  RowCentered,
  TextMuted,
  TextTiny,
  TextTitle,
  Touch,
} from "@components";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@hooks";
import { useToggleDiscountMutation } from "@state/api/barber";
import { DiscountType } from "@types";
import { Icon, Spinner } from "native-base";
import React, { memo } from "react";

interface Props {
  discount: DiscountType;
}
const DiscountRow: React.FC<Props> = ({ discount }) => {
  const [toggleDiscount, { isLoading: toggleLoading }] = useToggleDiscountMutation();
  const { user } = useAuth();
  return (
    <Column space={2}>
      <RowBetween>
        <Touch onPress={() => toggleDiscount({ barberId: user._id, discountId: discount._id! })}>
          {toggleLoading ? (
            <Spinner size={16} />
          ) : (
            <RowCentered space={1}>
              <TextTiny color={discount.isActive ? "success" : "warning"}>
                {discount.isActive ? "فعال" : "غیرفعال"}
              </TextTiny>
              <Icon
                as={Ionicons}
                size="sm"
                name={discount.isActive ? "lock-open-outline" : "lock-closed-outline"}
                color={discount.isActive ? "success" : "warning"}
              />
            </RowCentered>
          )}
        </Touch>

        <TextTitle>{`درصدی ${discount.percent} تخفیف `}</TextTitle>
      </RowBetween>
      {discount.reason && <TextMuted>{discount.reason}</TextMuted>}
    </Column>
  );
};

export default memo(DiscountRow);
