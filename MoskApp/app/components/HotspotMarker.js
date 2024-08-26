import React from 'react';
import { Marker } from 'react-native-maps';

// Definieer de HotspotMarker component
const HotspotMarker = ({ hotspot }) => (
  <Marker
    coordinate={{
      latitude: hotspot.latitude,  // Breedtegraad van de hotspot
      longitude: hotspot.longitude, // Lengtegraad van de hotspot
    }}
    title={hotspot.title}  // Titel van de marker
    description={hotspot.description}  // Beschrijving van de marker
  />
);

export default HotspotMarker;
