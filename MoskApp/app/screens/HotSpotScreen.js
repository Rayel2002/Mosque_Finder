import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HotspotItem from "../components/HotspotItem.js";
import SearchBar from "../components/SearchBar.js";
import { useTheme } from "../hooks/useTheme.js"; // Import useTheme hook

const HotspotScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Get the current theme
  const [hotspots, setHotspots] = useState([]);
  const [filteredHotspots, setFilteredHotspots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadHotspots = async () => {
      try {
        const storedHotspots = await AsyncStorage.getItem("hotspots");
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedHotspots) {
          const parsedHotspots = JSON.parse(storedHotspots);
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
        Alert.alert("Error", "There was an error loading the hotspots.");
      }
    };

    loadHotspots();
  }, []);

  useEffect(() => {
    const filterAndSortHotspots = () => {
      let filtered = hotspots;
      if (searchTerm !== "") {
        filtered = hotspots.filter(hotspot =>
          hotspot.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
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

  const handleFavoriteToggle = (itemId) => {
    let updatedFavorites;
    if (favorites.includes(itemId)) {
      updatedFavorites = favorites.filter(id => id !== itemId);
    } else {
      updatedFavorites = [...favorites, itemId];
    }
    setFavorites(updatedFavorites);
    AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const renderItem = ({ item }) => (
    <HotspotItem
      item={item}
      onPress={() => navigation.navigate("Map", { selectedHotspot: item })}
      isFavorite={favorites.includes(item.id)}
      onFavoriteToggle={() => handleFavoriteToggle(item.id)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        containerStyle={{ backgroundColor: theme.colors[1] }}
        inputStyle={{ color: theme.textColor, backgroundColor: theme.colors[2] }}
        borderColor={theme.colors[3]}
      />
      <FlatList
        data={filteredHotspots}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
