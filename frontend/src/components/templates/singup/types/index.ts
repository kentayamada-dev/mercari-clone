import { CreateUser } from "../../../../types/generated";

export type SignupTemplateProps = {
  isLoadingImage: boolean;
  isLoading: boolean;
  imageUrl: string;
  addUser: (data: CreateUser) => void;
  signinNavigationHandler: () => void;
  uploadImage: (formData: FormData) => void;
};
