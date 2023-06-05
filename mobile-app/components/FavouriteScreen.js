import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FavouriteScreen() {
  const [likedEvents, setLikedEvents] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!user) {
        // User is not logged in, redirect to LoginScreen
        navigation.navigate('Apie Tave');
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  eventBox: {
    width: 150,
    height: 200,
    margin: 10,
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
