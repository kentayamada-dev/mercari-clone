export type ToggleButtonGroupProps = {
  isLeftButtoFocused: boolean;
  isMiddleButtoFocused: boolean;
  isRightButtoFocused: boolean;
  leftButtonHandler: () => void;
  middleButtonHandler: () => void;
  rightButtonHandler: () => void;
  LeftButtonContent: React.VFC;
  MiddleButtonContent: React.VFC;
  RightButtonContent: React.VFC;
};
