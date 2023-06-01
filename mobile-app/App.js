import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import FilterScreen from './components/FilterScreen';
import LoginScreen from './components/LoginScreen';
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
    };

    return (
      <TouchableOpacity key={id} style={styles.eventBox} onPress={handlePress}>
        <Image source={{ uri: image_src }} style={styles.eventImage} />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.eventTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.eventContainer}>
      {events.map((event) => renderEventBox(event))}
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ title: 'Event Details' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{ title: 'Registration' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'LeiLink') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Ieškai?') {
              iconName = focused ? 'filter' : 'filter-outline';
            } else if (route.name === 'Apie Tave') {
              iconName = focused ? 'body-sharp' : 'body-outline';
            } else if (route.name === 'Mylimiausi') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Kur?!') {
              iconName = focused ? 'md-map' : 'md-map-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.button,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="LeiLink" component={HomeStack} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Ieškai?" component={FilterScreen} />
        <Tab.Screen name="Apie Tave" component={ProfileStack} options={{ tabBarLabel: 'Apie Tave' }} />
        <Tab.Screen name="Mylimiausi" component={FavoriteScreen} />
        <Tab.Screen name="Kur?!" component={MapsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eventContainer: {
    padding: 20,
  },
  eventBox: {
    marginBottom: 20,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  eventTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
  },
  details: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },
});
