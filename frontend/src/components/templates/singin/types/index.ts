import { Control, FieldError } from "react-hook-form";
import { BodyCreateTokenTokenPost } from "../../../../types/generated";

export type SigninTemplateProps = {
  isValid: boolean;
  isLoading: boolean;
  addSeller: () => void;
  errors: {
    username?: FieldError;
    password?: FieldError;
  };
  control: Control<BodyCreateTokenTokenPost, object>;
};
