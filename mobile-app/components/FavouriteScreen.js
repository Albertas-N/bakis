import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FavouriteScreen({ navigation, route }) {
  const [likedEvents, setLikedEvents] = useState([]);
  const user = route.params?.user;


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!route.params || !route.params.user) {
        // User is not logged in, redirect to LoginScreen
        navigation.navigate('Prisijungti');
        return;
      }
      
      const response = await fetch(`http://16.171.43.32:7000/userLiked/?user=${route.params.user.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const eventIds = data.map((event) => event.entertainment);

      const eventsResponse = await fetch('http://16.171.43.32:7000/vilniusEvents/');
      if (!eventsResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const eventsData = await eventsResponse.json();
      const userLikedEvents = eventsData.filter((event) => eventIds.includes(event.id));
      setLikedEvents(userLikedEvents);
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
    <ScrollView contentContainerStyle={styles.container}>
      {likedEvents.map((event) => renderEventBox(event))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  eventBox: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
