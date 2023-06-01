import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Check the user's login status here
    const userLoggedIn = false; // Replace with your login check logic

    if (!userLoggedIn) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'ProfileStack' }, // Assuming 'ProfileStack' is the name of the stack in App.js
            { name: 'LoginScreen' },
          ],
        })
      );
    }
  }, [navigation]);

  const handleRegister = () => {
    navigation.navigate('RegistrationScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to your profile!</Text>
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
