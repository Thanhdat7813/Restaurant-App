import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import TabNavigator from "./navigation/TabNavigator";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider, AuthContext } from "./context/AuthContext";

/* 👇 THÊM LẠI THEME */
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
};

function MainApp() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      
      {/* nền vàng */}
      <View style={styles.topBackground} />

      {/* 👇 GẮN THEME */}
      <NavigationContainer theme={MyTheme}>
        {user ? <TabNavigator /> : <LoginScreen />}
      </NavigationContainer>

    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },

  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#F6F3C6",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  }
});