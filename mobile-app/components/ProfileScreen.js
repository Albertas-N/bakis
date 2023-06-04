import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
  //const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  //const { user } = route.params;

  useEffect(() => {
    // Check the user's login status here
    const userLoggedIn = true; // Replace this with your actual login status check

    if (!userLoggedIn) {
      navigation.navigate('LoginScreen');
    } else {
      // Fetch user data from the server and set it in state
      fetch('http://16.171.43.32:7000/userRegister/')
        .then((response) => response.json())
        .then((data) => {
          // Assuming user data is an array, find the logged-in user
          const loggedInUser = data.find((user) => user.loggedIn === true);
          setUserData(loggedInUser);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  });

  const handleRegister = () => {
    navigation.navigate('RegistrationScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to LeiLink!</Text>
      {userData && (
        <View>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Username: {userData.username}</Text>
        </View>
      )}
      <Button title="Login" onPress={navigation.navigate('LoginScreen')}/>
      <Button title="Register" onPress={handleRegister} />
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
