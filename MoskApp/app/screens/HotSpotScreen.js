import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HotspotItem from "../components/HotspotItem.js";
import SearchBar from "../components/SearchBar.js";
import { useTheme } from "../hooks/useTheme.js"; // Importeer de useTheme-hook

const HotspotScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Haal het huidige thema op met de custom useTheme-hook
  const [hotspots, setHotspots] = useState([]); // State om alle hotspots op te slaan
  const [filteredHotspots, setFilteredHotspots] = useState([]); // State om gefilterde hotspots op te slaan op basis van zoekopdracht
  const [searchTerm, setSearchTerm] = useState(""); // State om de zoekterm op te slaan
  const [favorites, setFavorites] = useState([]); // State om favoriete hotspots op te slaan

  // useEffect om hotspots en favorieten uit AsyncStorage te laden wanneer de component wordt gemount
  useEffect(() => {
    const loadHotspots = async () => {
      try {
        const storedHotspots = await AsyncStorage.getItem("hotspots");
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedHotspots) {
          const parsedHotspots = JSON.parse(storedHotspots);
          // Zorg ervoor dat elke hotspot een uniek id heeft, zo niet, gebruik de index als id
          setHotspots(parsedHotspots.map((hotspot, index) => ({
            ...hotspot,
            id: hotspot.id || index.toString(),
          })));
          setFilteredHotspots(parsedHotspots);
        }
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        Alert.alert("Fout", "Er is een fout opgetreden bij het laden van de hotspots.");
      }
    };

    loadHotspots();
  }, []);

  // useEffect om hotspots te filteren en te sorteren op basis van de zoekterm en favorieten
  useEffect(() => {
    const filterAndSortHotspots = () => {
      let filtered = hotspots;
      if (searchTerm !== "") {
        filtered = hotspots.filter(hotspot =>
          hotspot.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      // Sorteer hotspots om favorieten bovenaan weer te geven
      filtered.sort((a, b) => {
        const aFavorite = favorites.includes(a.id);
        const bFavorite = favorites.includes(b.id);
        if (aFavorite && !bFavorite) return -1;
        if (!aFavorite && bFavorite) return 1;
        return 0;
      });
      setFilteredHotspots(filtered);
    };

    filterAndSortHotspots();
  }, [searchTerm, hotspots, favorites]);

  // Functie om het toggelen van favorieten af te handelen
  const handleFavoriteToggle = (itemId) => {
    let updatedFavorites;
    if (favorites.includes(itemId)) {
      updatedFavorites = favorites.filter(id => id !== itemId);
    } else {
      updatedFavorites = [...favorites, itemId];
    }
    setFavorites(updatedFavorites);
    AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Sla favorieten op in AsyncStorage
  };

  // Functie om elk hotspot-item te renderen
  const renderItem = ({ item }) => (
    <HotspotItem
      item={item}
      onPress={() => navigation.navigate("Map", { selectedHotspot: item })} // Navigeer naar de kaart met de geselecteerde hotspot
      isFavorite={favorites.includes(item.id)} // Controleer of het item een favoriet is
      onFavoriteToggle={() => handleFavoriteToggle(item.id)} // Wissel de favorietstatus
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <SearchBar
        searchTerm={searchTerm} // Huidige zoekterm doorgeven
        onSearchChange={setSearchTerm} // Zoekterm state bijwerken bij verandering
        containerStyle={{ backgroundColor: theme.colors[1] }} // Stijl de zoekbalkcontainer met themakleuren
        inputStyle={{ color: theme.textColor, backgroundColor: theme.colors[2] }} // Stijl het invoerveld van de zoekbalk met themakleuren
        borderColor={theme.colors[3]} // Stijl de rand van de zoekbalk met themakleuren
      />
      <FlatList
        data={filteredHotspots} // Gebruik gefilterde hotspots als data voor de FlatList
        renderItem={renderItem} // Render elk item met de renderItem-functie
        keyExtractor={item => item.id.toString()} // Haal unieke sleutel op voor elk item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HotspotScreen;
