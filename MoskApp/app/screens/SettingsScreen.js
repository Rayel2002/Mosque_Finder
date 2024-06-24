import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext.js';
import { lightTheme, darkTheme, deuteranopiaTheme, protanopiaTheme, tritanopiaTheme } from '../utils/Themes.js';
import { Picker } from '@react-native-picker/picker';
import { authenticateUser } from '../components/Authenticate.js';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await authenticateUser();
      if (isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        navigation.navigate('AuthFailed');
      }
    };

    authenticate();
  }, []);

  const handleThemeChange = (itemValue) => {
    setSelectedTheme(itemValue);
    toggleTheme(itemValue);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>Settings Screen</Text>
      {isAuthenticated ? (
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
      ) : (
        <Text style={[styles.text, { color: theme.textColor }]}>Authentication required to change settings.</Text>
      )}
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
