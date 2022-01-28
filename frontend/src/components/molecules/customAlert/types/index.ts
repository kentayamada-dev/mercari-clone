export type CustomAlertProps = {
  status: "error" | "warning" | "success";
  onPressCloseButton: () => void;
  text: string;
};
