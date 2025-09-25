import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./firebase";
import MainMenu from "./start";
// import SnakeApp from "../screens/logic";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {console.log("Login success"); 
        setIsUserLoggedIn(true);
    
        navigation.navigate("MainMenu");
    })
        .catch((err) => Alert.alert("Login error", err.message));
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

      {/* Title */}
      <Text style={styles.title}>Log In</Text>

      <SafeAreaView style={styles.form}>
        {/* Input Fields */}
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
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>Log In</Text>
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
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "#f57c00", fontWeight: "600", fontSize: 14 }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* StatusBar */}
      <StatusBar barStyle="light-content" />
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
