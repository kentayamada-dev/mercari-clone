import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SellingTemplate } from "../../components/templates/selling";
import { useAuth } from "../../hooks/auth/useAuth";
import { SellingStackParamList } from "../../types";

type Props = NativeStackScreenProps<SellingStackParamList, "Selling">;

export const Selling: React.VFC<Props> = ({
  navigation: { navigate },
  route: { params },
}) => {
  const { token } = useAuth();
  const [isModalOpen, setIsOpenModal] = React.useState(false);
  const [itemId, setItemId] = React.useState("");
  const [itemName, setItemName] = React.useState("");

  React.useEffect(() => {
    if (params?.itemId && params?.itemName) {
      setItemId(params.itemId);
      setItemName(params.itemName);
      setIsOpenModal(true);
    }
  }, [params]);

  const sellingDetailNavigationHandler = () => {
    if (token) {
      navigate("SellingDetail");
      setIsOpenModal(false);
    } else {
      navigate("AuthStackNavigator", {
        screen: "Signup",
      });
    }
  };

  const itemDetailNavigationHandler = () => {
    navigate("ItemDetailStackNavigator", {
      screen: "ItemDetail",
      params: { itemId: itemId, itemName: itemName },
    });
    setIsOpenModal(false);
  };

  return (
    <SellingTemplate
      openModal={isModalOpen}
      sellingDetailNavigationHandler={sellingDetailNavigationHandler}
      itemDetailNavigationHandler={itemDetailNavigationHandler}
    />
  );
};
