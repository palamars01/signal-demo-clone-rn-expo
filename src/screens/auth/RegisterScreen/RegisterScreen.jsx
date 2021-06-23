import React, { useState, useEffect } from "react";

import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Text, Input, Button } from "react-native-elements";

import styles from "./styles";
const { screen, title, inputContainer, button, imageContainer, image } = styles;

import { pickImage } from "../../../helpers/profileImagePicker";

import { FontAwesome } from "@expo/vector-icons";

import { auth } from "../../../../firebase";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  profileImageURI: "",
};

export function RegisterScreen() {
  const [inputsValue, setInputsValue] = useState(initialState);
  const { fullName, email, password, profileImageURI } = inputsValue;

  const [loading, setLoading] = useState(false);

  async function signUpHandler() {
    try {
      setLoading(true);
      if (fullName && email && password) {
        const createUserResponce = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        await createUserResponce.user.updateProfile({
          displayName: fullName,
          photoURL: profileImageURI,
        });
      } else {
        setLoading(false);
        Alert.alert("Oops,something went wrong", "Please,check the form", [
          { text: "Okay" },
        ]);
      }
    } catch (error) {
      Alert.alert(error.message, "Try again", [{ text: "Okay" }]);
      console.log("SIGN UP HANDLER ERROR", error);
      setLoading(false);
    }
  }

  function inputValueChange(stateField, text) {
    setInputsValue((prevState) => ({
      ...prevState,
      [stateField]: text,
    }));
  }

  function setInitialStates() {
    setInputsValue(initialState);
    setLoading(false);
  }

  useEffect(() => setInitialStates, []);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={screen}
      keyboardVerticalOffset={30}
    >
      <Text h4 style={title}>
        Create a Signal account
      </Text>
      <View style={inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={fullName}
          onChangeText={inputValueChange.bind(null, "fullName")}
          autoCapitalize="words"
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={inputValueChange.bind(null, "email")}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={inputValueChange.bind(null, "password")}
          autoCapitalize="none"
        />
        <Input
          placeholder="Profile Image"
          type="file"
          value={profileImageURI && "Image successfully loaded"}
          onTouchStart={pickImage.bind(null, (imageURL) =>
            inputValueChange("profileImageURI", imageURL)
          )}
          caretHidden
        />
        <TouchableOpacity
          style={imageContainer}
          onPress={pickImage.bind(null, (imageURL) =>
            inputValueChange("profileImageURI", imageURL)
          )}
        >
          {profileImageURI ? (
            <Image
              style={image}
              source={{ uri: inputsValue.profileImageURI }}
            />
          ) : (
            <FontAwesome name="photo" size={24} color="#ccc" />
          )}
        </TouchableOpacity>
      </View>

      <Button
        title={
          loading ? <ActivityIndicator size={20} color="#2288dc" /> : "Sign up"
        }
        containerStyle={button}
        type="outline"
        onPress={signUpHandler}
      />
    </KeyboardAvoidingView>
  );
}
