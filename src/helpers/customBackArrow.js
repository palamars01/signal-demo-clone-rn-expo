import React from "react";

import { AntDesign } from "@expo/vector-icons";

export function customBackArrow(color) {
  return {
    headerBackImage: () => <AntDesign name="left" size={22} color={color} />,
  };
}
