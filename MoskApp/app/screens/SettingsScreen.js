import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext.js';
import { lightTheme, darkTheme, deuteranopiaTheme, protanopiaTheme, tritanopiaTheme } from '../utils/Themes.js';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleThemeChange = (itemValue) => {
    setSelectedTheme(itemValue);
    toggleTheme(itemValue);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>Settings Screen</Text>
      <View style={styles.pickerContainer}>
        <Text style={[styles.text, { color: theme.textColor }]}>Select Theme</Text>
        <Picker
          selectedValue={selectedTheme}
          style={[styles.picker, { color: theme.textColor }]}
          onValueChange={(itemValue) => handleThemeChange(itemValue)}
          itemStyle={{ color: theme.textColor }} // Ensure the picker items use the theme's text color
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="Deuteranopia" value="deuteranopia" />
          <Picker.Item label="Protanopia" value="protanopia" />
          <Picker.Item label="Tritanopia" value="tritanopia" />
          {/* Add more options as needed */}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 150,
  },
});

export default SettingsScreen;
