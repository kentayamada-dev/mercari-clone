import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { SellingTemplate } from "../../components/templates/selling";
import { useAuth } from "../../hooks/auth/useAuth";
import { SellingStackParamList } from "../../types";

type Props = NativeStackScreenProps<SellingStackParamList, "Selling">;

export const Selling: React.VFC<Props> = ({ navigation, route }) => {
  const { token } = useAuth();
  const [isModalOpen, setIsOpenModal] = React.useState(false);
  const [itemId, setItemId] = React.useState("");
  const [itemName, setItemName] = React.useState("");

  React.useEffect(() => {
    if (route.params?.itemId && route.params?.itemName) {
      setItemId(route.params.itemId);
      setItemName(route.params.itemName);
      setIsOpenModal(true);
    }
  }, [route.params]);

  const sellingDetailNavigationHandler = () => {
    if (token) {
      navigation.navigate("SellingDetail");
      setIsOpenModal(false);
    } else {
      navigation.navigate("AuthStackNavigator", {
        screen: "Signup",
      });
    }
  };

  const itemDetailNavigationHandler = () => {
    navigation.navigate("ItemDetailStackNavigator", {
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
