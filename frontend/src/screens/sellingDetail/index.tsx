import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useToast } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CustomAlert } from "../../components/molecules/customAlert";
import { SellingDetailTemplate } from "../../components/templates/sellingDetail";
import { useAuth } from "../../hooks/auth/useAuth";
import { usePostItem } from "../../hooks/items/mutation";
import { usePostImage } from "../../hooks/common/mutation";
import { useQueryMe } from "../../hooks/sellers/query";
import { getAlert } from "../../modules";
import { OverrideType, SellingStackParamList } from "../../types";
import { ItemCreate } from "../../types/generated";

type Props = NativeStackScreenProps<SellingStackParamList, "SellingDetail">;

export interface CustomItemCreate extends OverrideType<ItemCreate, "price"> {
  price: string;
}

export const SellingDetail: React.VFC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CustomItemCreate>({
    mode: "onChange",
    defaultValues: {
      image_url: undefined,
      name: undefined,
      price: undefined,
      description: undefined,
    },
  });
  const toast = useToast();
  const { token } = useAuth();
  const { data: seller } = useQueryMe(token);
  const { t } = useTranslation(["signup", "sellingDetail"]);
  const { mutateAsync: mutateAsyncItem, isLoading: isLoadingItem } =
    usePostItem({
      sellerId: seller?.id || "",
    });

  const { mutateAsync: mutateAsyncImage, isLoading: isLoadingImage } =
    usePostImage({
      onSuccess: async (data) => {
        setValue("image_url", data.url);
      },
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

  const addItem = handleSubmit(async (data) => {
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
  });

  const uploadImage = async (formData: FormData) => {
    await mutateAsyncImage(formData);
  };

  return (
    <SellingDetailTemplate
      isLoading={isLoadingItem}
      imageUrl={getValues("image_url")}
      mutateAsyncImage={mutateAsyncImage}
      control={control}
      errors={errors}
      isLoadingImage={isLoadingImage}
      addItem={addItem}
      uploadImage={uploadImage}
    />
  );
};
