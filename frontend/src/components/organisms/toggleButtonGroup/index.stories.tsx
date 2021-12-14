import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ToggleButtonGroup } from "./index";
import { Text } from "native-base";

const RightButtonContent: React.VFC = () => <Text>Right Buton</Text>;
const MiddleButtonContent: React.VFC = () => <Text>Middle Button</Text>;
const LeftButtonContent: React.VFC = () => <Text>Left Button</Text>;

storiesOf("Organisms", module).add("ToggleButtonGroup", () => (
  <ToggleButtonGroup
    isLeftButtoFocused={boolean("Left Button Focused", false)}
    isMiddleButtoFocused={boolean("Middle Button Focused", false)}
    isRightButtoFocused={boolean("Right Button Focused", false)}
    leftButtonHandler={action("Left Button Clicked")}
    middleButtonHandler={action("Middle Button Clicked")}
    rightButtonHandler={action("Right Button Clicked")}
    RightButtonContent={RightButtonContent}
    MiddleButtonContent={MiddleButtonContent}
    LeftButtonContent={LeftButtonContent}
  />
));
