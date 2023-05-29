import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function EventDetailsScreen({ route }) {
  const { event } = route.params;

  return (
    <View style={styles.container}>
        <ScrollView>
            <Image source={{ uri: event.image_src }} style={styles.eventImage} />
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>Data ir laikas: {event.date}</Text>
            <Text style={styles.eventAddress}>Adresas: {event.address}</Text>
            <Text style={styles.eventCategory}>Kategorija: {event.category}</Text>
            <Text style={styles.eventContent}>{event.content}</Text>
            <Text style={styles.eventWorkingHours}>Darbo laikas: {event.working_hours || '-'}</Text>
            
            <Text style={styles.eventRating}>Įvertinimas: {event.rating || '-'}</Text>
            <Text style={styles.eventCategory}>Susisiekite:</Text>
            <Text style={styles.eventEmail}>Elektroniniu paštu: {event.email || '-'}</Text>
            <Text style={styles.eventPhoneNumber}>Telefonu: {event.phone_number || '-'}</Text>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventAddress: {
    marginBottom: 5,
  },
  eventContent: {
    marginBottom: 10,
  },
  eventEmail: {
    marginBottom: 5,
  },
  eventWorkingHours: {
    marginBottom: 5,
  },
  eventCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventPhoneNumber: {
    marginBottom: 5,
  },
  eventRating: {
    marginBottom: 5,
  },
});
