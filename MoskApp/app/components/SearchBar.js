import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, onSearchChange, containerStyle, inputStyle, borderColor }) => {
  return (
    <View style={[styles.container, containerStyle, { borderColor }]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder="Search hotspots..."
        placeholderTextColor={inputStyle.color}
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
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    paddingLeft: 10,
  },
});

export default SearchBar;
