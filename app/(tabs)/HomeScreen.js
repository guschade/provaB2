import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { supabase } from "./index";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo à Tela Inicial!</Text>
      <Button title="Logout" onPress={handleLogout} color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
  },
});

export default HomeScreen;
