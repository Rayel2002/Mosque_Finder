import React from 'react';
import { Marker } from 'react-native-maps';

const HotspotMarker = ({ hotspot }) => {
  return (
    <Marker
      coordinate={{
        latitude: hotspot.latitude,
        longitude: hotspot.longitude,
      }}
      title={hotspot.title}
      description={hotspot.description}
    />
  );
};

export default HotspotMarker;
