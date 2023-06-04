import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProfileLoggedScreen({ navigation, route }) {
    const user = route.params?.user;
  
    useEffect(() => {
      if (user) {
        navigation.navigate('Mylimiausi', { user });
        navigation.navigate('Home', { user });
      }
    }, [user]);

    const handleLogout = () => {
      
        // Clear user authentication data     
        (user) => user.email === '' && user.password === ''
        console.log('Logging off');
        
        navigation.navigate('Prisijungti');
      };
      
      return (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Atsijungti</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Labas, {user.username}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Tavo prisijungimo duomenys:</Text>
            <Text style={styles.infoText}>Tavo el. paštas: {user.email}</Text>
            <Text style={styles.infoText}>Tavo vardas: {user.name}</Text>
          </View>
        </View>
      );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 20,
        },
        buttonContainer: {
          alignSelf: 'flex-end',
          marginRight: 20,
          marginTop: 10,
        },
        button: {
          backgroundColor: '#034F34',
          borderRadius: 5,
          padding: 10,
        },
        buttonText: {
          color: '#EEF0ED',
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        greetingContainer: {
          marginTop: 20,
        },
        greetingText: {
          color: '#034F34',
          fontSize: 25,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        contentContainer: {
          marginTop: 20,
          alignItems: 'left',
        },
        headerText: {
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 10,
        },
        infoText: {
          marginBottom: 5,
        },
      });
      