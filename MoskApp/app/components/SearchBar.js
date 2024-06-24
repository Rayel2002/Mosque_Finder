import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, onSearchChange, containerStyle, inputStyle, borderColor }) => {
  return (
    <View style={[styles.container, containerStyle, { borderColor }]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder="Search hotspots..."
        placeholderTextColor={inputStyle.color} // Use text color for placeholder as well
        value={searchTerm}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  borderColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2, // Added border width for the dynamic border color
    borderRadius: 5,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default SearchBar;
