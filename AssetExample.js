import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const games = [
  {
    title: "Crimson Desert",
    image:
      "https://store-images.s-microsoft.com/image/apps.45738.13616283370123336.55bc585b-1fc2-4652-8965-61111d6975e0.5236f2e9-a0f4-4fc1-8aba-dbf96b812b95",
    rating: 5,
  },
  {
    title: "Marvel's Spider-Man 2",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/6/64/Spider-Man_2_2023_capa.jpg",
    rating: 5,
  },
  {
    title: "Hollow Knight: Silksong",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/8/86/Hollow_Knight_Silksong_cover.jpeg",
    rating: 5,
  },
  {
    title: "Control",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERJ7i4V2i_F4AnORa60EPN1SfF-hgB_-MO3GoctWG38NjuNdWmoYdOe0&s=10",
    rating: 5,
  },
];

export default function Home({ navigation }) {
  const [ratings] = useState(games.map((game) => game.rating));

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.containerContent}
      ListHeaderComponent={
        <>
          {/* NAVBAR */}
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={styles.navbarTitle}>Black Flag</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Games")}>
              <Text style={styles.navbarLink}>Jogos</Text>
            </TouchableOpacity>
          </View>

          {/* BANNER */}
          <View style={styles.banner}>
            <Image
              source={{
                uri: "https://cdng.europosters.eu/pod_public/1300/271437.jpg",
              }}
              style={styles.bannerImage}
            />

            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>GTA VI</Text>
              <Text style={styles.bannerText}>
                Preparados para o jogo do século?
              </Text>
            </View>
          </View>

          {/* TÍTULO */}
          <Text style={styles.title}>Jogos mais bem avaliados</Text>
        </>
      }
      data={games}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />

          <Text style={styles.cardTitle}>{item.title}</Text>

          <Text style={styles.cardRating}>
          ★★★★★  
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3b0a14",
  },

  containerContent: {
    paddingBottom: 20,
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#2a0810",
  },

  navbarTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  navbarLink: {
    color: "#f5a623",
    fontSize: 16,
    fontWeight: "600",
  },

  banner: {
    width: "100%",
    height: 220,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerText: {
    color: "#ddd",
    fontSize: 14,
    marginTop: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
  },

  card: {
    backgroundColor: "#4a0f1c",
    margin: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
  },

  cardImage: {
    width: width * 0.8,
    height: 220,
    borderRadius: 10,
    resizeMode: "cover",
    alignSelf: "center",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#fff",
  },

  cardRating: {
    fontSize: 16,
    color: "#f5a623",
  },
});