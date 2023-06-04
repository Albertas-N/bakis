import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer, CommonActions, useRoute, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import FilterScreen from './components/FilterScreen';
import LoginScreen from './components/LoginScreen';
import FavoriteScreen from './components/FavouriteScreen';
import MapsScreen from './components/Maps';
import EventDetailsScreen from './components/EventDetailsScreen';
import RegistrationScreen from './components/RegistrationScreen';
import ProfileLoggedScreen from './components/ProfileLoggedScreen';

const colors = {
  top: "#034F34",
  text: '#00000',
  buttonText: '#EEF0ED',
  background: '#FCF5ED',
  button: '#034F34',
  bottom: "#B28E7C",
};

function HomeScreen() {
  const route = useRoute();
  const user = route.params?.user;
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!user) {
      console.log('User not logged in');
    }
  }, [user]);

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

  const handlePress = () => {
    navigation.navigate('EventDetails', { event });
  };

  const handleLike = async (event) => {
    if (!user) {
      console.log('User not logged in');
      return;
    }

    const requestBody = {
      id: event.id,
      user: user?.id,
      entertainment: event.id,
    };

    console.log('Request Body:', requestBody);

    try {
      const response = await fetch('http://16.171.43.32:7000/userLiked/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to like the event');
      }
      console.log('Response: ', response);
      console.log('Successfully liked event!');
      // Handle successful like
      // Update the liked state in the events array
      setEvents((prevEvents) => {
        return prevEvents.map((prevEvent) => {
          if (prevEvent.id === event.id) {
            return {
              ...prevEvent,
              liked: true,
            };
          }
          return prevEvent;
        });
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle like error
    }
  };

  const renderEventBox = (event) => {
    const { id, title, image_src, liked } = event;

    return (
      <TouchableOpacity key={id} style={styles.eventBox} onPress={handlePress}>
        <Image source={{ uri: image_src }} style={styles.eventImage} />
        <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(event)}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={25} color="#034F34" />
        </TouchableOpacity>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.eventTitle}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.eventContainer}>
      {events.map((event) => renderEventBox(event))}
    </ScrollView>
  );
}

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
        name="Prisijungti"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{ title: 'Registracija' }}
      />
      <Stack.Screen
        name="ProfileLoggedScreen"
        component={ProfileLoggedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

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
    position: 'relative',
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
  likeButton: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 10,
    padding: 5,
    top: 10,
    right: 10,
  },
});
