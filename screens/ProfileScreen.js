import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Dimensions,
  Alert
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/AuthContext";

const width = Dimensions.get("window").width;

export default function ProfileScreen() {
  const { logout, user } = useContext(AuthContext);

  // xử lý logout
  const handleLogout = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn đăng xuất không?",
      [
        { text: "Hủy" },
        { text: "Đăng xuất", onPress: logout }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} />
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* AVATAR */}
      <View style={styles.avatarWrapper}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <Image
          source={require("../assets/avatar.png")}
          style={styles.avatar}
        />

        <View style={styles.editBtn}>
          <Feather name="edit-2" size={18} color="white" />
        </View>
      </View>

      {/* PROFILE CARD */}
      <View style={styles.card}>
        
        <Text style={styles.name}>
          {user?.email || "User"}
        </Text>

        <Text style={styles.email}>
          {user?.email || "example@gmail.com"}
        </Text>

        {/* MENU */}
        <View style={styles.menu}>
          <MenuItem icon="home-outline" text="Home" />
          <MenuItem icon="card-outline" text="My Card" />

          <View style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <Ionicons name="moon-outline" size={24} />
              <Text style={styles.menuText}>Dark Mode</Text>
            </View>
            <Switch />
          </View>

          <MenuItem icon="location-outline" text="Track Your Order" />
          <MenuItem icon="settings-outline" text="Settings" />
          <MenuItem icon="help-circle-outline" text="Help Center" />
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Ionicons name="log-out-outline" size={20} color="white" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

/* MENU COMPONENT */
function MenuItem({ icon, text }) {
  return (
    <View style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={24} />
        <Text style={styles.menuText}>{text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={22} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    paddingHorizontal: 25
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold"
  },

  avatarWrapper: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: -60
  },

  circle1: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "#DDD"
  },

  circle2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#EEE"
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65
  },

  editBtn: {
    position: "absolute",
    right: width / 2 - 95,
    bottom: 5,
    backgroundColor: "#5f3dc4",
    padding: 7,
    borderRadius: 20
  },

  card: {
    flex: 1,
    backgroundColor: "#EDECBF",
    marginTop: 70,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingTop: 90,
    paddingHorizontal: 30,
    paddingBottom: 40
  },

  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center"
  },

  email: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginBottom: 40
  },

  menu: {
    gap: 30
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18
  },

  menuText: {
    fontSize: 18
  },

  logoutBtn: {
    marginTop: 40,
    backgroundColor: "#4C3CFF",
    padding: 20,
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10
  },

  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  }
});