import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FavouriteScreen() {
  const [likedEvents, setLikedEvents] = useState([]);
  const userId = 1; // Replace with the logged-in user's ID

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://16.171.43.32:7000/userLiked/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const userLikedEvents = data.filter((event) => event.user === userId);
      setLikedEvents(userLikedEvents);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {likedEvents.map((event) => (
        <Text key={event.id}>{`Event ID: ${event.id}`}</Text>
        // Render the event boxes using the data of the user's liked events
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
