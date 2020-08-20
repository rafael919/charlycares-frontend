import React from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const Maps = ({ center, height }) => (
  <Map
    center={center}
    zoom={14}
    minZoom={5}
    height={height}
    attribution={false}
    twoFingerDrag={true}
  >
    <Marker anchor={center} payload={1} />
  </Map>
);

export default Maps;
