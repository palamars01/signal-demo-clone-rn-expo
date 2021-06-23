import { TransitionPresets } from "@react-navigation/stack";

export const screenOptions = {
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTitleStyle: {
    color: "#000",
    alignItems: "center",
  },
  headerTintColor: "#000",
  headerTitleAlign: "center",
  ...TransitionPresets.RevealFromBottomAndroid,
};
