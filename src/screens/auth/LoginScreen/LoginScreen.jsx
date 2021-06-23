import React, { useState, useRef } from "react";

import { View, KeyboardAvoidingView, Alert } from "react-native";

import { Image, Input, Button } from "react-native-elements";

import { styles } from "./styles";
const { screen, image, inputContainer, button } = styles;

import { auth } from "../../../../firebase";

export function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passwordInputRef = useRef();

  async function handleLogin() {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("LOGIN HANDLER ERROR = ", error);
      Alert.alert("Something goes wrong", "Email or password is wrong", [
        {
          text: "I'll check it",
        },
      ]);
    }
  }

  function handleMoveToSignUpScreen() {
    navigation.navigate("Register");
  }

  return (
    <KeyboardAvoidingView
      style={screen}
      behavior="height"
      keyboardVerticalOffset={50}
    >
      <Image
        source={{
          uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={image}
      />
      <View style={inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={(event) => passwordInputRef.current.focus()}
          blurOnSubmit={false}
        />
        <Input
          ref={passwordInputRef}
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          onSubmitEditing={handleLogin}
          returnKeyType="go"
        />
      </View>

      <Button title="Login" containerStyle={button} onPress={handleLogin} />
      <Button
        title="Sign up"
        containerStyle={button}
        type="outline"
        onPress={handleMoveToSignUpScreen}
      />

      <View style={{ height: 150 }} />
    </KeyboardAvoidingView>
  );
}
