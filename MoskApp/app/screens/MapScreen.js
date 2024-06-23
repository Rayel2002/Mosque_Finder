import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { fetchData } from "../utils/FetchApi.js";

const MapScreen = () => {
  const [hotspots, setHotspots] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHotspots = async () => {
      try {
        const data = await fetchData();
        console.log("Fetched data:", data); // Log the fetched data

        if (Array.isArray(data)) {
          console.log("Hotspots:", data); // Log the hotspots array
          setHotspots(data);
        } else {
          setError("Invalid data structure received");
          console.error("Invalid data structure received:", data); // Log invalid data structure
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err); // Log the error
      }
    };

    getHotspots();
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <MapView
          style={styles.map} // Use styles for the map
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default MapScreen;
