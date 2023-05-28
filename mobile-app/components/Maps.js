import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


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
      <GooglePlacesAutocomplete
      styles={{
        container: styles.container,
        textInputContainer: styles.autocompleteContainer,
        textInput: styles.inputField,
        listView: styles.listView,
        poweredContainer: styles.poweredContainer,
        powered: styles.powered,
      }}
      placeholder='Search'
      onPress={(data, details = null) => {
        // Handle the selected place
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyARGjzXLegDAQIKZ922ju3adCFpepvlU2o',
        //language: 'lt', // Language of the results
        //components: 'country:us', // Restrict results to a specific country (optional)
      }}
      currentLocation={true} // Enable current location
      currentLocationLabel='Current location'
      enablePoweredByContainer={false}
    />
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
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: 10,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    elevation: 4,
  },
  inputField: {
    height: 40,
    borderWidth: 0,
  },
  listView: {
    width: '90%',
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    elevation: 4,
  },
  poweredContainer: {
    display: 'none',
  },
  powered: {},
  
});
