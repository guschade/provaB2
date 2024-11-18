import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import uvv from "@/assets/images/UVV.png";
import { supabase } from "./index";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Usuário logado:", user);
      setError("Perfil já logado em outra tela.");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao realizar login:", error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={uvv} />
      <Text style={styles.header}>Seja bem-vindo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.footer}>
        <Button title="Entrar" onPress={handleLogin} color="#007BFF" />{" "}
        {/* Botão azul */}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.forgotButton]}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.buttonText}>Esqueci Minha Senha</Text>
        </TouchableOpacity>
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
    marginTop: 40,
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
  footer: {
    marginTop: 20,
    height: 150,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  registerButton: {
    backgroundColor: "green",
  },
  forgotButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginScreen;
