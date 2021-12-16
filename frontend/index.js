import { registerRootComponent } from "expo";
import { Root } from "./src/Root";
import { CONSTANTS } from "./src/constants";
import { StorybookUIRoot } from "./storybook/index";

const RootComponent =
  CONSTANTS.ENV.NODE_ENV === "storybook" ? StorybookUIRoot : Root;
registerRootComponent(RootComponent);
