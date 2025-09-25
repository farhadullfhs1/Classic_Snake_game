import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { doc, setDoc } from "firebase/firestore";
import Login  from "./login";
import Signup from "./signup";
import SnakeApp from "./logic";
import MainMenu from "./start";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu" initialParams={{}}>
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SnakeApp" component={SnakeApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





