import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from "../hooks/useTheme.js";
import { Ionicons } from "@expo/vector-icons";

// HotspotItem-component wordt gedefinieerd, ontvangt verschillende props om een item weer te geven.
const HotspotItem = ({ item, onPress, isFavorite, onFavoriteToggle }) => {
  // Haal het huidige thema op via de useTheme-hook.
  const { theme } = useTheme();

  return (
    // Hele component is klikbaar; bij klik wordt onPress-functie aangeroepen.
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        {/* Tekstcontainer voor de titel en beschrijving van het item */}
        <View style={styles.textContainer}>
          {/* Titel van het item, met dynamische kleur op basis van het huidige thema */}
          <Text style={[styles.itemTitle, { color: theme.textColor }]}>
            {item.title}
          </Text>
          {/* Beschrijving van het item, ook met dynamische kleur */}
          <Text style={[styles.itemDescription, { color: theme.textColor }]}>
            {item.description}
          </Text>
        </View>
        {/* Favoriet-icoon; als erop wordt geklikt, wordt onFavoriteToggle-functie aangeroepen */}
        <TouchableOpacity onPress={onFavoriteToggle}>
          <Ionicons
            // Icoon verandert afhankelijk van of het item favoriet is of niet
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            // Kleur van het icoon verandert afhankelijk van favoriet-status en thema
            color={isFavorite ? "red" : theme.textColor}
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// PropTypes-definitie voor typevalidatie van props
HotspotItem.propTypes = {
  item: PropTypes.object.isRequired,          // Het item-object is vereist
  onPress: PropTypes.func.isRequired,         // onPress-functie is vereist
  isFavorite: PropTypes.bool.isRequired,      // isFavorite-boolean is vereist
  onFavoriteToggle: PropTypes.func.isRequired, // onFavoriteToggle-functie is vereist
};

// Stijlen voor de HotspotItem-component
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",  // Plaatst kinderen (tekst en icoon) naast elkaar in een rij
    justifyContent: "space-between",  // Ruimte tussen tekst en favoriet-icoon
    alignItems: "center",  // Uitlijning van items in het midden
    padding: 16,  // Padding binnen de container
    borderBottomWidth: 1,  // Onderkant krijgt een randje
    borderBottomColor: "#ccc",  // Kleur van de onderkant rand
  },
  textContainer: {
    flex: 1,  // Neemt de beschikbare ruimte in de rij
  },
  itemTitle: {
    fontSize: 18,  // Tekengrootte voor de titel
    fontWeight: "bold",  // Vetgedrukte tekst voor de titel
  },
  itemDescription: {
    fontSize: 14,  // Tekengrootte voor de beschrijving
    color: "#666",  // Standaard kleur voor de beschrijving (wordt overschreven door thema)
  },
  favoriteIcon: {
    marginLeft: 10,  // Ruimte aan de linkerkant van het icoon
  },
});

// Exporteer de HotspotItem-component zodat deze in andere bestanden gebruikt kan worden
export default HotspotItem;
