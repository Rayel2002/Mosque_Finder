import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { fetchData } from '../utils/FetchApi.js';
import HotspotMarker from '../components/HotspotMarker.js';

const MapScreen = () => {
  const [hotspots, setHotspots] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const loadHotspots = async () => {
      try {
        const storedHotspots = await AsyncStorage.getItem('hotspots');
        if (storedHotspots !== null) {
          setHotspots(JSON.parse(storedHotspots));
        } else {
          const data = await fetchData();
          console.log('Fetched data:', data);
          if (Array.isArray(data)) {
            console.log('Hotspots:', data);
            setHotspots(data);
            await AsyncStorage.setItem('hotspots', JSON.stringify(data));
          } else {
            setError('Invalid data structure received');
            console.error('Invalid data structure received:', data);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      try {
        const { coords } = await getCurrentPositionAsync({});
        setLocation(coords);
      } catch (error) {
        setError('Could not fetch location');
        console.error(error);
      }
    };

    getLocation();
    loadHotspots();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location ? location.latitude : 51.917404,
            longitude: location ? location.longitude : 4.484861,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {hotspots.map((hotspot, index) => (
            <HotspotMarker key={index} hotspot={hotspot} />
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default MapScreen;
