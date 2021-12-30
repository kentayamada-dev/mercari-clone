import { Control, FieldError } from "react-hook-form";
import { UseMutateAsyncFunction } from "react-query";
import { ImageModel } from "../../../../types/generated";

export type SignupTemplateProps = {
  isValid: boolean;
  isLoading: boolean;
  addSeller: () => void;
  imageUrl: string;
  mutateAsyncImage: UseMutateAsyncFunction<
    ImageModel,
    Error,
    FormData,
    unknown
  >;
  errors: {
    name?: FieldError;
    email?: FieldError;
    password?: FieldError;
    image_url?: FieldError;
  };
  control: Control<
    {
      name: string;
      email: string;
      password: string;
      image_url: string;
    },
    object
  >;
};
