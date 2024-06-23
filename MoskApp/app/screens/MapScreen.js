import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { fetchData } from "../utils/FetchApi.js";

const MapScreen = () => {
  const [hotspots, setHotspots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (hasHardware && supported.length > 0) {
        const authResult = await LocalAuthentication.authenticateAsync();
        if (!authResult.success) {
          Alert.alert("Authentication failed", "Please try again");
          return;
        }
      }
      loadHotspots();
    };

    const loadHotspots = async () => {
      try {
        const storedHotspots = await AsyncStorage.getItem("hotspots");
        if (storedHotspots !== null) {
          setHotspots(JSON.parse(storedHotspots));
        } else {
          const data = await fetchData();
          console.log("Fetched data:", data);
          if (Array.isArray(data)) {
            console.log("Hotspots:", data);
            setHotspots(data);
            await AsyncStorage.setItem("hotspots", JSON.stringify(data));
          } else {
            setError("Invalid data structure received");
            console.error("Invalid data structure received:", data);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };

    authenticate();
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.917404,
            longitude: 4.484861,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {hotspots.map((hotspot, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: hotspot.latitude,
                longitude: hotspot.longitude,
              }}
              title={hotspot.title}
              description={hotspot.description}
            />
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
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default MapScreen;
