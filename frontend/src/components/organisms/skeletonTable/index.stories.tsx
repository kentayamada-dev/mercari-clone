import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { SkeletonTable } from "./index";

storiesOf("Organisms", module).add("SkeletonTable", () => (
  <SkeletonTable numbers={number("Numbers", 10)} />
));
