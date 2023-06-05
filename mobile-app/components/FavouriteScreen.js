import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FavouriteScreen() {
  const [likedEvents, setLikedEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params?.user;

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    try {
      if (!user) {
        // User is not logged in, redirect to Apie Tave screen
        navigation.navigate('Apie Tave');
        return;
      }

      const response = await fetch(`http://16.171.43.32:7000/userLiked/?user=${user.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredLikedEvents = data.filter((liked) => liked.user === user.id);
      const eventIds = filteredLikedEvents.map((liked) => liked.entertainment);

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

  const handleLogout = () => {
    setLikedEvents([]); // Reset likedEvents state
    navigation.navigate('Apie Tave');
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

  const handleRefresh = () => {
    if (!refreshing) {
      setRefreshing(true);
      fetchData().then(() => {
        setRefreshing(false);
      });
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView
          contentContainerStyle={styles.eventContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
          {likedEvents.map((event) => renderEventBox(event))}
        </ScrollView>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.text}>Prisijunki, kad pamatytum savo mylimiausius</Text>
          {/*<TouchableOpacity style={styles.loginButton} onPress={handleLogout}>
            <Text style={styles.loginButtonText}>Prisijungti</Text>
      </TouchableOpacity>*/}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  loginContainer: {
    width: '90%',
  },
  loginButton: {
    backgroundColor: '#034F34',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    
  },
  loginButtonText: {
    color: '#EEF0ED',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold',}
});
