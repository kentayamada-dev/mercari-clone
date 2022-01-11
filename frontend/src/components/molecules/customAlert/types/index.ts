export type CustomAlertProps = {
  status: "error" | "warning";
  onPressCloseButton: () => void;
  text: string;
};
