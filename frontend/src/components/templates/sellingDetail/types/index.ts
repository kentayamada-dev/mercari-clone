import { UseMutateAsyncFunction } from "react-query";
import { ImageModel } from "../../../../types/generated";
import { AxiosError } from "axios";
import { Control, FieldError } from "react-hook-form";
import { CustomItemCreate } from "../../../../screens/sellingDetail";

export type SellingDetailTemplateProps = {
  imageUrl?: string;
  isLoading: boolean;
  isLoadingImage: boolean;
  addItem: () => Promise<void>;
  uploadImage: (formData: FormData) => Promise<void>;
  mutateAsyncImage: UseMutateAsyncFunction<
    ImageModel,
    AxiosError<any>,
    FormData,
    unknown
  >;
  errors: {
    name?: FieldError;
    price?: FieldError;
    description?: FieldError;
    image_url?: FieldError;
  };
  control: Control<CustomItemCreate, object>;
};
