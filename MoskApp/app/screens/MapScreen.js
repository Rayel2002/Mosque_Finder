import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { fetchData } from "../utils/FetchApi.js"; // Hulpfunctie om hotspotgegevens op te halen
import { useTheme } from "../hooks/useTheme.js"; // Custom hook om thema-instellingen te beheren

const MapScreen = ({ route }) => {
  const { theme } = useTheme(); // Haal het huidige thema op met de custom hook
  const [hotspots, setHotspots] = useState([]); // State voor het opslaan van hotspots
  const [error, setError] = useState(null); // State voor het afhandelen van fouten
  const [isLoading, setIsLoading] = useState(true); // State voor het afhandelen van de laadstatus
  const [location, setLocation] = useState(null); // State voor het opslaan van de huidige locatie
  const [selectedHotspot, setSelectedHotspot] = useState(null); // State voor het opslaan van de geselecteerde hotspot

  // Ref voor de geselecteerde marker (om de callout te manipuleren)
  const selectedHotspotMarkerRef = useRef(null);

  useEffect(() => {
    // Controleer of er een hotspot via route-params is doorgegeven en stel deze in als geselecteerd
    if (route.params?.selectedHotspot) {
      setSelectedHotspot(route.params.selectedHotspot);
    }

    const loadHotspots = async () => {
      try {
        // Probeer hotspots op te halen uit AsyncStorage
        const storedHotspots = await AsyncStorage.getItem("hotspots");
        if (storedHotspots) {
          // Als opgeslagen hotspots bestaan, gebruik deze
          setHotspots(JSON.parse(storedHotspots));
        } else {
          // Als er geen opgeslagen hotspots zijn, haal ze dan op via de API
          const data = await fetchData();
          setHotspots(data);
          await AsyncStorage.setItem("hotspots", JSON.stringify(data)); // Sla opgehaalde gegevens op in AsyncStorage
        }
      } catch (err) {
        // Fouten afhandelen tijdens het laden van hotspots
        setError(err.message);
        Alert.alert("Fout bij het laden van hotspots", err.message, [{ text: "OK" }]);
      } finally {
        setIsLoading(false); // Zet de laadstatus op false als alles klaar is
      }
    };

    const getLocation = async () => {
      try {
        // Vraag om toestemming voor locatiegebruik op de voorgrond
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") throw new Error("Locatietoestemming geweigerd");
        const { coords } = await getCurrentPositionAsync({});
        setLocation(coords); // Sla de opgehaalde locatiecoördinaten op
      } catch (error) {
        // Fouten afhandelen bij het ophalen van de locatie
        setError(error.message);
        Alert.alert("Fout bij het ophalen van locatie", error.message, [{ text: "OK" }]);
      }
    };

    // Roep de functies aan om de locatie en hotspots te laden
    getLocation();
    loadHotspots();
  }, [route.params]);

  useEffect(() => {
    // Zorg ervoor dat de Callout wordt getoond als de geselecteerde hotspot is ingesteld
    if (selectedHotspot && selectedHotspotMarkerRef.current) {
      selectedHotspotMarkerRef.current.showCallout();
    }
  }, [selectedHotspot]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.textColor} />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.textColor }]}>
            Fout: {error}
          </Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedHotspot
              ? selectedHotspot.latitude
              : location?.latitude || 51.917404,
            longitude: selectedHotspot
              ? selectedHotspot.longitude
              : location?.longitude || 4.484861,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: selectedHotspot
              ? selectedHotspot.latitude
              : location?.latitude || 51.917404,
            longitude: selectedHotspot
              ? selectedHotspot.longitude
              : location?.longitude || 4.484861,
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
              pinColor={
                selectedHotspot && selectedHotspot.id === hotspot.id
                  ? "blue"
                  : "red"
              }
              ref={
                selectedHotspot && selectedHotspot.id === hotspot.id
                  ? selectedHotspotMarkerRef
                  : null
              }
            >
              {/* Dit zorgt ervoor dat de callout correct wordt weergegeven */}
              <Callout>
                <View>
                  <Text style={{ fontWeight: "bold" }}>{hotspot.title}</Text>
                  <Text>{hotspot.description}</Text>
                </View>
              </Callout>
            </Marker>
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
