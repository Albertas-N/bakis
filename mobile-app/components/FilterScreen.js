import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native';

export default function FilterScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('');

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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (option) => {
    setSortBy(option);
    setSortModalVisible(false);
  

  let sortedEvents = [...events];

  switch (option) {
      case 'Pavadinimas':
        sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
        /*
      case 'Date':
        sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'Location':
        sortedEvents.sort((a, b) => a.location.localeCompare(b.location));
        break;*/
      default:
        // No sorting or default sorting option
        break;
    }

    setEvents(sortedEvents);
  };

  const filterEvents = (event) => {
    // Apply search filter based on event title
    if (searchQuery !== '' && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortModalVisible(true)}
      >
        <Text style={styles.sortButtonText}>Rikiuoti: {sortBy !== '' ? sortBy : 'Pasirink!'}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.eventContainer}>
        {events.filter(filterEvents).map((event) => renderEventBox(event))}
      </ScrollView>
      <Modal
        visible={sortModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.sortModal}>
            <Text style={styles.sortModalTitle}>Rikiuoti</Text>
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSort('Pavadinimas')}
            >
              <Text style={styles.sortOptionText}>Pavadinimas</Text>
            </TouchableOpacity>
            {/*
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSort('Date')}
            >
              <Text style={styles.sortOptionText}>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sortOption}
              onPress={() => handleSort('Location')}
            >
              <Text style={styles.sortOptionText}>Location</Text>
            </TouchableOpacity>*/}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '90%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sortButton: {
    backgroundColor: '#eaeaea',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  sortButtonText: {
    fontSize: 16,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortModal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  sortModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sortOption: {
    paddingVertical: 10,
  },
  sortOptionText: {
    fontSize: 16,
  },
});
