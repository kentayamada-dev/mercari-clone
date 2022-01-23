import { BodyCreateTokenTokenPost } from "../../../../types/generated";

export type SigninTemplateProps = {
  isLoading: boolean;
  addSeller: (data: BodyCreateTokenTokenPost) => void;
};
