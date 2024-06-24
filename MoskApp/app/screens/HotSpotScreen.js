import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HotspotItem from "../components/HotspotItem.js";
import SearchBar from "../components/SearchBar.js";
import { useTheme } from "../context/ThemeContext.js"; // Import useTheme hook
import { themes } from "../utils/Themes.js"; // Import themes from the external file

const HotspotScreen = ({ navigation }) => {
  const { theme } = useTheme(); // Get the current theme
  const [hotspots, setHotspots] = useState([]);
  const [filteredHotspots, setFilteredHotspots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadHotspots = async () => {
      try {
        const storedHotspots = await AsyncStorage.getItem("hotspots");
        if (storedHotspots) {
          const parsedHotspots = JSON.parse(storedHotspots);
          setHotspots(parsedHotspots.map((hotspot, index) => ({
            ...hotspot,
            id: hotspot.id || index.toString(),
          })));
          setFilteredHotspots(parsedHotspots);
        }
      } catch (error) {
        Alert.alert("Error", "There was an error loading the hotspots.");
      }
    };

    loadHotspots();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredHotspots(hotspots);
    } else {
      setFilteredHotspots(
        hotspots.filter(hotspot =>
          hotspot.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, hotspots]);

  const renderItem = ({ item }) => (
    <HotspotItem
      item={item}
      onPress={() => navigation.navigate("Map", { selectedHotspot: item })}
    />
  );

  const currentThemeColors = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: currentThemeColors[0] }]}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        containerStyle={{ backgroundColor: currentThemeColors[1] }}
        inputStyle={{ color: theme.textColor, backgroundColor: currentThemeColors[2] }}
        borderColor={currentThemeColors[3]}
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
