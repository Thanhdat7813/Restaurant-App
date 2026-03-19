import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = () => {
    setSubmitted(true);

    if (!email || !password) return;

    login(email, password);
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <Text style={styles.sub}>Chào mừng bạn quay trở lại!</Text>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        
        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Nhập email của bạn"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Mật khẩu</Text>
        <View style={styles.passwordBox}>
          <TextInput
            placeholder="Nhập mật khẩu"
            style={styles.inputPass}
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* ERROR */}
        {submitted && (!email || !password) && (
          <Text style={styles.error}>
            Vui lòng điền đầy đủ thông tin
          </Text>
        )}

        {/* FORGOT */}
        <Text style={styles.forgot}>Quên mật khẩu?</Text>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <Text style={styles.register}>
          Chưa có tài khoản?{" "}
          <Text style={styles.link}>
            Đăng ký ngay
          </Text>
        </Text>

        {/* OR */}
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={{ marginHorizontal: 10 }}>hoặc</Text>
          <View style={styles.line} />
        </View>

        {/* SOCIAL */}
        <View style={styles.socialRow}>
          
          {/* GOOGLE */}
          <View style={styles.socialBtn}>
            <AntDesign name="google" size={20} color="#DB4437" />
            <Text style={styles.socialText}>Google</Text>
          </View>

          {/* FACEBOOK */}
          <View style={styles.socialBtn}>
            <FontAwesome name="facebook" size={20} color="#1877F2" />
            <Text style={styles.socialText}>Facebook</Text>
          </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  header: {
    height: 220,
    backgroundColor: "#F6F3C6",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 32,
    fontWeight: "bold"
  },

  sub: {
    color: "#666",
    marginTop: 10
  },

  form: {
    padding: 20
  },

  label: {
    marginTop: 15,
    marginBottom: 5
  },

  input: {
    backgroundColor: "#eee",
    borderRadius: 12,
    padding: 15
  },

  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 15
  },

  inputPass: {
    flex: 1,
    paddingVertical: 15
  },

  error: {
    color: "red",
    marginTop: 10
  },

  forgot: {
    color: "#4c4cff",
    textAlign: "right",
    marginTop: 5
  },

  button: {
    backgroundColor: "#4c4cff",
    padding: 16,
    borderRadius: 30,
    marginTop: 25,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  register: {
    textAlign: "center",
    marginTop: 20
  },

  link: {
    color: "#4c4cff",
    fontWeight: "bold"
  },

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center"
  },

  line: {
    height: 1,
    backgroundColor: "#ccc",
    flex: 1
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },

  socialBtn: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 12,
    width: "48%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },

  socialText: {
    fontWeight: "bold"
  }
});