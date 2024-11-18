import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import { supabase } from "./index";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
      } else {
        Alert.alert(
          "Sucesso",
          "Um e-mail com instruções para redefinir a senha foi enviado."
        );
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Redefinir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.buttonRow}>
        <Button
          title="Redefinir Senha"
          onPress={handleResetPassword}
          color="green"
        />
        <Button
          title="Voltar ao Login"
          onPress={() => navigation.navigate("Login")}
          color="green"
        />
      </View>
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
  input: {
    height: 50,
    width: "50%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
});

export default ForgotPasswordScreen;
