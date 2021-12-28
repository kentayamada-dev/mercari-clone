import { Control, FieldError } from "react-hook-form";

export type SignupTemplateProps = {
  isValid: boolean;
  isLoading: boolean;
  addSeller: () => void;
  errors: {
    name?: FieldError;
    email?: FieldError;
    password?: FieldError;
  };
  control: Control<
    {
      name: string;
      email: string;
      password: string;
    },
    object
  >;
};
