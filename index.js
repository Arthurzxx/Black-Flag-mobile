import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from "react-native";

const { width } = Dimensions.get("window");

const gamesList = [
  {
    id: "1",
    title: "Crimson Desert",
    image:
      "https://store-images.s-microsoft.com/image/apps.45738.13616283370123336.55bc585b-1fc2-4652-8965-61111d6975e0.5236f2e9-a0f4-4fc1-8aba-dbf96b812b95",
  },
  {
    id: "2",
    title: "Marvel's Spider-Man 2",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/6/64/Spider-Man_2_2023_capa.jpg",
  },
  {
    id: "3",
    title: "Hollow Knight: Silksong",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/8/86/Hollow_Knight_Silksong_cover.jpeg",
  },
  {
    id: "4",
    title: "Control",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERJ7i4V2i_F4AnORa60EPN1SfF-hgB_-MO3GoctWG38NjuNdWmoYdOe0&s=10",
  },
  {
    id: "5",
    title: "Grand Theft Auto VI",
    image: "https://cdng.europosters.eu/pod_public/1300/271437.jpg",
  },
  {
    id: "6",
    title: "Elden Ring",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/b/b9/Elden_Ring_Box_art.jpg",
  },
  {
    id: "7",
    title: "God of War Ragnarök",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/a/a9/God_of_War_Ragnar%C3%B6k_capa.jpg",
  },
  {
    id: "8",
    title: "The Last of Us Part II",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/4/4f/The_Last_of_Us_Part_II_Capa.jpg",
  },
  {
    id: "9",
    title: "Red Dead Redemption 2",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/4/44/Red_Dead_Redemption_II.jpg",
  },
  {
    id: "10",
    title: "Cyberpunk 2077",
    image:
      "https://upload.wikimedia.org/wikipedia/pt/9/9f/Cyberpunk_2077_box_art.jpg",
  },
];

// NAVBAR
function Navbar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.navbarTitle}>Black Flag</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Games")}>
        <Text style={styles.navbarLink}>Jogos</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function Games({ navigation }) {
  const [reviews, setReviews] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const openModal = (game) => {
    const existing = reviews[game.id];
    setSelectedGame(game);
    setRating(existing?.rating || 0);
    setReview(existing?.review || "");
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedGame(null);
  };

  const handleSave = () => {
    if (rating === 0) {
      Alert.alert("Selecione uma nota", "Escolha de 1 a 5 estrelas antes de salvar.");
      return;
    }

    setReviews((prev) => ({
      ...prev,
      [selectedGame.id]: { rating, review },
    }));

    closeModal();
  };

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />

      <FlatList
        contentContainerStyle={styles.containerContent}
        ListHeaderComponent={<Text style={styles.title}>Todos os jogos</Text>}
        data={gamesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const myReview = reviews[item.id];

          return (
            <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />

              <Text style={styles.cardTitle}>{item.title}</Text>

              {myReview ? (
                <Text style={styles.cardRating}>
                  {"★".repeat(myReview.rating) + "☆".repeat(5 - myReview.rating)}
                </Text>
              ) : (
                <Text style={styles.cardNoRating}>Avaliar este jogo</Text>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* MODAL DE AVALIAÇÃO */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedGame && (
              <>
                <Image source={{ uri: selectedGame.image }} style={styles.modalImage} />

                <Text style={styles.modalTitle}>{selectedGame.title}</Text>

                <Text style={styles.label}>Sua nota</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                      <Text style={styles.star}>{star <= rating ? "★" : "☆"}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Sua resenha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Escreva o que achou do jogo..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                  value={review}
                  onChangeText={setReview}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  cardNoRating: {
    fontSize: 14,
    color: "#aaa",
    fontStyle: "italic",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: "#4a0f1c",
    borderRadius: 16,
    padding: 20,
    maxHeight: "85%",
  },

  modalImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    resizeMode: "cover",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginVertical: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginTop: 8,
    marginBottom: 6,
  },

  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 6,
  },

  star: {
    fontSize: 32,
    color: "#f5a623",
    marginHorizontal: 4,
  },

  input: {
    backgroundColor: "#3b0a14",
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    textAlignVertical: "top",
    minHeight: 80,
    fontSize: 14,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#2a0810",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },

  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#6200ea",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8,
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});