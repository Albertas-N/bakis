import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function MapsScreen() {
  const [location, setLocation] = useState({});
  const [markers, setMarkers] = useState([]);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
      } else {
        console.log('Permission granted');
      }
      const loc = await Location.getCurrentPositionAsync();
      console.log(loc);
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://16.171.43.32:7000/vilniusEvents/');
        const data = await response.json();
        setMarkers(
          data
            .filter(marker => marker.latitude !== null && marker.longitude !== null && marker.latitude !== "null" && marker.longitude !== "null")
            .map(marker => ({
              ...marker,
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            }))
        );
      } catch (error) {
        console.log('Error fetching markers:', error);
      }
    };
  
    fetchData();
  }, []);

  const region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const navigation = useNavigation();

  const handleMarkerPress = (marker) => {
    navigation.navigate('EventDetailsMaps', { event: marker });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tavo lokacija!"
            pinColor="blue"
          />
        )}
  
        {markers.map(marker => (
          <TouchableOpacity
            key={marker.id}
            onPress={() => handleMarkerPress(marker)}
          >
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
              onPress={() => handleMarkerPress(marker)}
            />
          </TouchableOpacity>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
