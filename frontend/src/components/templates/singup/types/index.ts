import { Control, FieldError } from "react-hook-form";
import { UseMutateAsyncFunction } from "react-query";
import { ImageModel, SellerCreate } from "../../../../types/generated";
import { AxiosError } from "axios";

export type SignupTemplateProps = {
  isLoadingImage: boolean;
  isValid: boolean;
  isLoading: boolean;
  addSeller: () => void;
  signinNavigationHandler: () => void;
  imageUrl: string;
  mutateAsyncImage: UseMutateAsyncFunction<
    ImageModel,
    AxiosError<any>,
    FormData,
    unknown
  >;
  errors: {
    name?: FieldError;
    email?: FieldError;
    password?: FieldError;
    image_url?: FieldError;
  };
  control: Control<SellerCreate, object>;
};
