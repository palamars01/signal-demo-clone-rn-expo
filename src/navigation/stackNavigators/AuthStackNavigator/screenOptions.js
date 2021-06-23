import { TransitionPresets } from "@react-navigation/stack";

export const screenOptions = {
  headerStyle: {
    backgroundColor: "#2492e9",
  },
  headerTitleStyle: {
    color: "#fff",
    alignItems: "center",
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
  ...TransitionPresets.RevealFromBottomAndroid,
};
