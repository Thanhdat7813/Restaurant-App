import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

export default function HomeScreen() {

  const [activeSlide, setActiveSlide] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // DATA
  const products = [
    { id: 1, name: "BURGER", image: require("../assets/burgeritems.png") },
    { id: 2, name: "PIZZA", image: require("../assets/pizza.png") }
  ];

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // filter
  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleScroll = (event) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / (width * 0.8)
    );
    setActiveSlide(slide);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image source={require("../assets/avatar.png")} style={styles.avatar} />

        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>Your Location</Text>
          <Text style={styles.location}>Ha Noi, Viet Nam</Text>
        </View>

        <Ionicons name="notifications-outline" size={26} style={styles.bell} />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="white" />

        <TextInput
          placeholder="Search your food"
          placeholderTextColor="white"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        {/* ❌ CLEAR BUTTON */}
        {search !== "" && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* ================= SEARCH MODE ================= */}
      {search !== "" ? (

        <>
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>Kết quả tìm kiếm</Text>
          </View>

          <View style={styles.popularRow}>
            {filteredProducts.map(item => (
              <View style={styles.foodCard} key={item.id}>
                <Image source={item.image} style={styles.foodImg} />
                <Text style={styles.foodText}>{item.name}</Text>
              </View>
            ))}
          </View>

          {filteredProducts.length === 0 && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Không tìm thấy sản phẩm
            </Text>
          )}
        </>

      ) : (

        <>
          {/* CATEGORY */}
          <View style={styles.categoryRow}>
            <View style={[styles.category, { backgroundColor: "#2ecc71" }]}>
              <Image source={require("../assets/pizza1.png")} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>PIZZA</Text>
            </View>

            <View style={[styles.category, styles.categoryActive]}>
              <Image source={require("../assets/burger1.png")} style={styles.categoryIcon} />
              <Text style={styles.categoryTextDark}>BURGER</Text>
            </View>

            <View style={styles.category}>
              <Image source={require("../assets/drink1.png")} style={styles.categoryIcon} />
              <Text style={styles.categoryTextDark}>DRINK</Text>
            </View>

            <View style={styles.category}>
              <Image source={require("../assets/rice1.png")} style={styles.categoryIcon} />
              <Text style={styles.categoryTextDark}>RICE</Text>
            </View>
          </View>

          {/* SLIDER */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >

            <View style={styles.offerCard}>
              <Image source={require("../assets/burger.png")} style={styles.offerImage} />
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>10% OFF</Text>
              </View>
              <View style={styles.offerText}>
                <Text style={styles.offerTitle}>BURGER</Text>
                <Text style={styles.offerSub}>Today's Hot offer</Text>
                <Text style={styles.rating}>⭐ 4.9 (3k+ Rating)</Text>
              </View>
            </View>

            <View style={styles.offerCard}>
              <Image source={require("../assets/pizza.png")} style={styles.offerImage} />
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>10% OFF</Text>
              </View>
              <View style={styles.offerText}>
                <Text style={styles.offerTitle}>PIZZA</Text>
                <Text style={styles.offerSub}>Special Pizza</Text>
                <Text style={styles.rating}>⭐ 4.8 (2k+ Rating)</Text>
              </View>
            </View>

            <View style={styles.offerCard}>
              <Image source={require("../assets/burgeritems.png")} style={styles.offerImage} />
              <View style={styles.discountTag}>
                <Text style={styles.discountText}>10% OFF</Text>
              </View>
              <View style={styles.offerText}>
                <Text style={styles.offerTitle}>BURGER</Text>
                <Text style={styles.offerSub}>Hot Burger Deal</Text>
                <Text style={styles.rating}>⭐ 4.7 (2k+ Rating)</Text>
              </View>
            </View>

          </ScrollView>

          {/* DOTS */}
          <View style={styles.dotContainer}>
            <View style={[styles.dot, activeSlide === 0 && styles.dotActive]} />
            <View style={[styles.dot, activeSlide === 1 && styles.dotActive]} />
            <View style={[styles.dot, activeSlide === 2 && styles.dotActive]} />
          </View>

          {/* POPULAR */}
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>Popular Items</Text>
            <Text style={styles.viewAll}>View All</Text>
          </View>

          <View style={styles.popularRow}>
            {products.map(item => (
              <View style={styles.foodCard} key={item.id}>
                <Image source={item.image} style={styles.foodImg} />
                <Text style={styles.foodText}>{item.name}</Text>
              </View>
            ))}
          </View>

        </>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  content: { padding: 20, paddingTop: 70 },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25 },

  locationBox: { alignItems: "center", flex: 1 },
  locationTitle: { fontSize: 12, color: "#666" },
  location: { fontWeight: "bold", fontSize: 18 },

  bell: { marginLeft: 10 },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#5f3dc4",
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 30
  },

  searchInput: { flex: 1, marginLeft: 10, color: "white" },

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40
  },

  category: {
    backgroundColor: "#eee",
    width: 90,
    height: 100,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center"
  },

  categoryActive: {
    borderWidth: 2,
    borderColor: "#3498db"
  },

  categoryIcon: {
    width: 45,
    height: 45,
    resizeMode: "contain"
  },

  categoryText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 8
  },

  categoryTextDark: {
    fontWeight: "bold",
    marginTop: 8
  },

  offerCard: {
    width: width * 0.8,
    height: 200,
    borderRadius: 20,
    marginRight: 20,
    overflow: "hidden",
    backgroundColor: "#000"
  },

  offerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  discountTag: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#e74c3c",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10
  },

  discountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12
  },

  offerText: {
    position: "absolute",
    bottom: 15,
    left: 15
  },

  offerTitle: {
    color: "#f1c40f",
    fontSize: 24,
    fontWeight: "bold"
  },

  offerSub: { color: "white" },

  rating: {
    color: "white",
    marginTop: 5
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 25
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5
  },

  dotActive: {
    backgroundColor: "#5f3dc4",
    width: 16
  },

  popularHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },

  popularTitle: {
    fontWeight: "bold",
    fontSize: 20
  },

  viewAll: {
    color: "#888"
  },

  popularRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  foodCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    height: 220
  },

  foodImg: {
    width: "100%",
    height: 160,
    borderRadius: 12
  },

  foodText: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16
  }
});