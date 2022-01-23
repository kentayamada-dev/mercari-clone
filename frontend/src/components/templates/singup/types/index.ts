import { SellerCreate } from "../../../../types/generated";

export type SignupTemplateProps = {
  isLoadingImage: boolean;
  isLoading: boolean;
  imageUrl: string;
  addSeller: (data: SellerCreate) => void;
  signinNavigationHandler: () => void;
  uploadImage: (formData: FormData) => void;
};
