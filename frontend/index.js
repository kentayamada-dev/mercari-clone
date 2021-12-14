import { registerRootComponent } from "expo";
import { App } from "./src/App";
import { CONSTANTS } from "./src/constants";
import { StorybookUIRoot } from "./storybook/index";

const Root = CONSTANTS.NODE_ENV === "storybook" ? StorybookUIRoot : App;
registerRootComponent(Root);
