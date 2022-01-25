import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useToast } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { CustomAlert } from "../../components/molecules/customAlert";
import { SellingDetailTemplate } from "../../components/templates/sellingDetail";
import { useAuth } from "../../hooks/auth/useAuth";
import { usePostItem } from "../../hooks/items/mutation";
import { usePostImage } from "../../hooks/common/mutation";
import { getAlert } from "../../modules";
import { OverrideType, SellingStackParamList } from "../../types";
import { ItemCreate } from "../../types/generated";

type Props = NativeStackScreenProps<SellingStackParamList, "SellingDetail">;

export interface CustomItemCreate extends OverrideType<ItemCreate, "price"> {
  price: string;
}

export const SellingDetail: React.VFC<Props> = ({ navigation }) => {
  const [imageUrl, setImageUrl] = React.useState("");
  const toast = useToast();
  const { token } = useAuth();
  const { t } = useTranslation(["signup", "sellingDetail"]);
  const { mutateAsync: mutateAsyncItem, isLoading: isLoadingItem } =
    usePostItem({ token });

  const { mutateAsync: mutateAsyncImage, isLoading: isLoadingImage } =
    usePostImage({
      onSuccess: async (data) => setImageUrl(data.url),
      onError: () =>
        getAlert(
          toast,
          <CustomAlert
            status="error"
            onPressCloseButton={() => toast.closeAll()}
            text={t("signup:imageError")}
          />
        ),
    });

  const addItem = React.useCallback(async (data: CustomItemCreate) => {
    if (data.image_url === undefined) {
      getAlert(
        toast,
        <CustomAlert
          status="warning"
          onPressCloseButton={() => toast.closeAll()}
          text={t("sellingDetail:selectImage")}
        />
      );
    } else {
      const responseData = await mutateAsyncItem({
        ...data,
        price: Number(data.price),
      });
      navigation.navigate("Selling", {
        itemId: responseData.id,
        itemName: responseData.name,
      });
    }
  }, []);

  const uploadImage = React.useCallback(async (formData: FormData) => {
    await mutateAsyncImage(formData);
  }, []);

  return (
    <SellingDetailTemplate
      isLoading={isLoadingItem}
      imageUrl={imageUrl}
      isLoadingImage={isLoadingImage}
      addItem={addItem}
      uploadImage={uploadImage}
    />
  );
};
