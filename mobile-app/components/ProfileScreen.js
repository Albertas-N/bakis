import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation();
  
    useEffect(() => {
      // Check the user's login status here
      const userLoggedIn = false; // Replace with your login check logic
  
      if (!userLoggedIn) {
        navigation.navigate('Login');
      }
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to your profile!</Text>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
