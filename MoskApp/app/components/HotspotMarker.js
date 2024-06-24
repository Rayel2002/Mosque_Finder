import React from 'react';
import { Marker } from 'react-native-maps';

const HotspotMarker = ({ hotspot }) => (
  <Marker
    coordinate={{
      latitude: hotspot.latitude,
      longitude: hotspot.longitude,
    }}
    title={hotspot.title}
    description={hotspot.description}
  />
);

export default HotspotMarker;
