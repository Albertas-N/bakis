import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import FilterScreen from './components/FilterScreen';
import LoginScreen from '././components/LoginScreen';
import FavoriteScreen from './components/FavouriteScreen';
import MapsScreen from './components/Maps';
import EventDetailsScreen from './components/EventDetailsScreen';
import RegistrationScreen from './components/RegistrationScreen';
import ProfileScreen from './components/ProfileScreen';



const colors = {
  top: "#034F34",
  text: '#00000',
  buttonText: '#EEF0ED',
  background: '#FCF5ED', 
  button: '#034F34',
  bottom: "#B28E7C",
};

function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('http://16.171.43.32:7000/vilniusEvents/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderEventBox = (event) => {
    const { id, title, image_src } = event;

    const handlePress = () => {
      navigation.navigate('EventDetails', { event });
      //console.log('EventDetails', {event});
    };

    return (
      <TouchableOpacity key={id} style={styles.eventBox} onPress={handlePress}>
        <Image source={{ uri: image_src }} style={styles.eventImage} />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.eventTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.eventContainer}>
        {events.map((event) => renderEventBox(event))}
      </ScrollView>
    </View>
  );
}

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.uri }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.details}>Enter details here:</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();



function MyTabs() {
  return (
    <Tab.Navigator style={styles.navigator}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'LeiLink') {
          iconName = focused
            ? 'information-circle'
            : 'information-circle-outline';
        } else if (route.name === 'Ieškai?') {
          iconName = focused 
          ? 'filter' 
          : 'filter-outline';
        } else if (route.name === 'Apie Tave') {
          iconName = focused 
          ? 'body-sharp' 
          : 'body-outline';
        } else if (route.name === 'Mylimiausi') {
          iconName = focused 
          ? 'bookmark' 
          : 'bookmark-outline';
        } else if (route.name === 'Kur?!'){
          iconName = focused 
          ? 'md-map'
          : 'md-map-outline';
        }
        
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.button,
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="LeiLink" component={HomeScreen} options={{tabBarBadge:3}}/>
      <Tab.Screen name="Ieškai?" component={FilterScreen} />
      <Tab.Screen name="Apie Tave" component={ProfileScreen} />
      <Tab.Screen name="Mylimiausi" component={FavoriteScreen} />
      <Tab.Screen name="Kur?!" component={MapsScreen}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen style={styles.navigator} name="Home" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
        </NavigationContainer>
        );
}
          
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    margin: 10,
    alignItems: 'center',
    },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  details: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.button,
    marginHorizontal: 3,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigator: {
    backgroundColor: colors.bottom,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  eventBox: {
    width: 350,
    height: 250,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

/*export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
