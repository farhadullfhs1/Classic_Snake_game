import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar } from "react-native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "./firebase";


const onHandleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout success");
        // You can navigate the user to the login screen or any other screen after logout
        navigation.navigate("Login");
      })
      .catch((err) => Alert.alert("Logout error", err.message));
  };


  export default onHandleLogout;