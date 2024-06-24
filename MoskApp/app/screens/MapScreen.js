import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUser } from "../components/Authenticate.js";
import { fetchData } from "../utils/FetchApi.js";
import HotspotMarker from "../components/HotspotMarker.js";

const MapScreen = () => {
  const [hotspots, setHotspots] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await authenticateUser();
      if (isAuthenticated) {
        loadHotspots();
      } else {
        setError("Authentication failed");
        setIsLoading(false);
      }
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
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
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
            latitude: 51.917404,
            longitude: 4.484861,
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
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default MapScreen;
