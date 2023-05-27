import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function FilterScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('http://13.51.199.146:8000/vilniusEvents/');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventContainer: {
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
