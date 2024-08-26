import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// Definieer de SearchBar component
const SearchBar = ({ searchTerm, onSearchChange, containerStyle, inputStyle, borderColor }) => {
  return (
    // Weergave van de zoekbalk met aangepaste stijlen
    <View style={[styles.container, containerStyle, { borderColor }]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder="Search hotspots..." // Placeholder tekst voor de zoekbalk
        placeholderTextColor={inputStyle.color} // Kleur van de placeholder tekst, wordt aangepast aan inputStyle
        value={searchTerm} // Huidige waarde van de zoekbalk
        onChangeText={onSearchChange} // Functie die wordt aangeroepen bij het wijzigen van de tekst
      />
    </View>
  );
};

// Definieer de prop-types voor de component
SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired, // Vereist: De huidige zoekterm
  onSearchChange: PropTypes.func.isRequired, // Vereist: Functie om de zoekterm te updaten
  containerStyle: PropTypes.object, // Optioneel: Extra stijlen voor de container van de zoekbalk
  inputStyle: PropTypes.object, // Optioneel: Extra stijlen voor de tekstinvoer
  borderColor: PropTypes.string, // Optioneel: Kleur van de rand van de zoekbalk
};

// Stijlen voor de SearchBar component
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    paddingLeft: 10,
  },
});

export default SearchBar;
