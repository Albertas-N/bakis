import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FavouriteScreen({ route }) {
  const [likedEvents, setLikedEvents] = useState([]);
  const { user } = route.params;

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
      const userLikedEvents = data.filter((event) => event.user === user.id);
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
