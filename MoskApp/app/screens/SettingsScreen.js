import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext.js';
import { authenticateUser } from '../components/Authenticate';
import { useNavigation } from '@react-navigation/native';
import { themes } from '../utils/Themes.js'; // Import themes from the external file

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

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

  const handleThemeChange = (selectedTheme) => {
    toggleTheme(selectedTheme);
    setShowThemes(false);
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleShowThemes = () => {
    setShowThemes(!showThemes);
    Animated.timing(animation, {
      toValue: showThemes ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const currentThemeKey = Object.keys(themes).find(key => 
    themes[key].backgroundColor === theme.backgroundColor && 
    themes[key].textColor === theme.textColor
  );

  const currentThemeName = currentThemeKey ? themes[currentThemeKey].name : 'Unknown';

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {isAuthenticated ? (
        <>
          <TouchableOpacity
            style={styles.selectThemeButton}
            onPress={toggleShowThemes}
          >
            <Text style={[styles.buttonText, { color: theme.textColor }]}>
              {`${currentThemeName}`}
            </Text>
          </TouchableOpacity>
          <Animated.View style={[styles.scrollContainer, { transform: [{ scale }], opacity }]}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}
            >
              {Object.keys(themes).map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.themeSquare,
                    theme.backgroundColor === themes[key].backgroundColor && styles.selectedTheme,
                  ]}
                  onPress={() => handleThemeChange(key)}
                >
                  {themes[key].colors.map((color, index) => (
                    <View
                      key={index}
                      style={[
                        styles.colorBlock,
                        { backgroundColor: color },
                      ]}
                    />
                  ))}
                  <Text style={[styles.themeText, { color: themes[key].textColor }]}>
                    {themes[key].name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </>
      ) : (
        <Text style={[styles.text, { color: theme.textColor }]}>
          Authentication required to change settings.
        </Text>
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectThemeButton: {
    width: width * 0.9,
    padding: 15,
    backgroundColor: '#4CAF50', // Shade of green
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  scrollContainer: {
    height: 120, // Set a fixed height to prevent layout issues
  },
  scrollView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeSquare: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  colorBlock: {
    flex: 1,
    width: '100%',
  },
  themeText: {
    position: 'absolute',
    bottom: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  selectedTheme: {
    borderWidth: 2,
    borderColor: '#6200ee',
  },
});

export default SettingsScreen;
