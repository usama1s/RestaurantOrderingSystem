import React from "react";
//Components
import { ManagerOrderSlider } from "./slider";
import { ManagerOrderCards } from "./cards";
import { TEST_SLIDER, TEST_CARDS } from "../../../../utils/test";

export function ManagerOrder() {
  return (
    <>
      <ManagerOrderSlider TEST_SLIDER={TEST_SLIDER} />
      <ManagerOrderCards TEST_CARDS={TEST_CARDS} />
    </>
  );
}
