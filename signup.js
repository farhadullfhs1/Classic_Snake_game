import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,database } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { doc, setDoc } from "firebase/firestore";


export default function Signup({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const onHandleSignup = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        
        const userRef = doc(database, "users", user.uid);
        await setDoc(userRef, {
          email: email,
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    };


    
    useEffect(() => {
      return () => {
        setEmail("");
        setPassword("");
      };
    }, []);

  
    return (
  
      
      <View style={styles.container}>
        
        <View style={styles.whiteSheet} />
        <Text style={styles.title}>Sign Up</Text>
        <SafeAreaView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            showSoftInputOnFocus={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={() => {onHandleSignup();navigation.navigate('Login')}}>
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>Sign Up</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>Log In</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
  
      
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    whiteSheet: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 20,
    },
    form: {
      width: "80%",
      padding: 20,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 10,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: "#007BFF",
      borderRadius: 5,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  