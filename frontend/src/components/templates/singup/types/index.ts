import { Control, FieldError } from "react-hook-form";
import { SellerCreate } from "../../../../types/generated";

export type SignupTemplateProps = {
  isLoadingImage: boolean;
  isValid: boolean;
  isLoading: boolean;
  addSeller: () => void;
  signinNavigationHandler: () => void;
  imageUrl: string;
  uploadImage: (formData: FormData) => Promise<void>;
  errors: {
    name?: FieldError;
    email?: FieldError;
    password?: FieldError;
    image_url?: FieldError;
  };
  control: Control<SellerCreate, object>;
};
