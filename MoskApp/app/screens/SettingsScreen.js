import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext.js';
import { Picker } from '@react-native-picker/picker';
import { authenticateUser } from '../components/Authenticate';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../utils/Themes.js';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const isAuthenticated = await authenticateUser();
        setIsAuthenticated(isAuthenticated);
        if (!isAuthenticated) {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        Alert.alert('Authentication error', error.message, [{ text: 'OK' }]);
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
            onValueChange={handleThemeChange}
            itemStyle={{ color: theme.textColor }}
          >
            {Object.keys(themes).map((key) => (
              <Picker.Item label={key.charAt(0).toUpperCase() + key.slice(1)} value={key} key={key} />
            ))}
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
