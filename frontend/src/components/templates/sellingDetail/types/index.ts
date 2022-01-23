import { CustomItemCreate } from "../../../../screens/sellingDetail";

export type SellingDetailTemplateProps = {
  imageUrl?: string;
  isLoading: boolean;
  isLoadingImage: boolean;
  addItem: (data: CustomItemCreate) => void;
  uploadImage: (formData: FormData) => void;
};
