import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';

export default function MapsScreen() {
    const [location, setLocation] = useState({})
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status!== 'granted') {
                alert('Permission to access location was denied')
            } else{
                console.log('Permission granted')
            }
            const loc = await Location.getCurrentPositionAsync()
            console.log(loc)
            setLocation(loc.coords)
        })();
    }, []);

    const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    
  return (
    <View style={styles.container}>
        <MapView style={styles.map} region={region}>
            <Marker coordinate={region} title="Marker Title" description="Marker Description" />
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
