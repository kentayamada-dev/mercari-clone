import { BodyCreateTokenTokenPost } from "../../../../types/generated";

export type SigninTemplateProps = {
  isLoading: boolean;
  addUser: (data: BodyCreateTokenTokenPost) => void;
};
