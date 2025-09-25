// Import necessary components and libraries
import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Alert,Image,ImageBackground} from "react-native";
import SnakeApp from "./logic";
import { updateHighScore, getCurrentUser, auth,database } from "./firebase";
import saap from "./saapimg";
import { doc, collection, getDoc} from "firebase/firestore";

// Main Menu Screen
const MainMenu = ({ navigation }) => {
  const [highScore, setHighScore] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

   useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, []))

    const fetchUserData = async () => {
        try {
          // Get the current user
          const user = await getCurrentUser();
      
          if (user) {
            // If the user is logged in, fetch the high score
            const userId = user.uid;
            const userDocRef = doc(collection(database, 'users'), userId);
            
            // Fetch the user document from Firebase
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              // Retrieve the high score field from the user document
              const userHighScore = userDoc.data().highScore || 0;
      
              // Update the state with the fetched data
              setHighScore(userHighScore);
              setUserEmail(user.email);
              setIsUserLoggedIn(true);
            } else {
              console.warn("User document not found");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };      

  const showHighScorePopup = () => {
    // Display a popup dialog box with the high score and user email
    Alert.alert("High Score", `User: ${userEmail}\nHigh Score: ${highScore}`);
  };






  const onHandleLogout = () => {
    // Use the signOut function from the auth module
    auth.signOut()
      .then(() => {
        console.log("Logout success");
        setIsUserLoggedIn(false);
        Alert.alert("Logout Successfull !")
        // You can navigate the user to the login screen or any other screen after logout
        navigation.navigate("MainMenu");
      })
      .catch((err) => Alert.alert("Logout error", err.message));
  };




  return (
    <View style={styles.container}>
      <ImageBackground source={saap} style = {styles.backgroundImage}/>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SnakeApp")} disabled={!isUserLoggedIn}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>

      {/* login  */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showHighScorePopup} disabled={!isUserLoggedIn} style={styles.button}>
        <Text style={styles.buttonText}>High Score </Text>
      </TouchableOpacity>



{/* logout  */}
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 15,
          borderRadius: 10,
          marginVertical: 10,
          width: 200,
          alignItems: "center",
        }}
        onPress={onHandleLogout}
      >
        <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 0,
    width: "70%",
    height: "55%",
    resizeMode: "contain",
    position:"relative",
    top:120,
    left:35,
  },
  whiteSheet: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default MainMenu;
