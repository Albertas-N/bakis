import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://16.171.43.32:7000/userRegister/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = () => {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    // Perform login logic here
    const user = userList.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      // Handle successful login, navigate to the next screen, etc.
      navigation.navigate('ProfileLoggedScreen', { user: user });
      console.log('Login successful');
    } else {
      // Handle login error
      console.log('Login failed');
    }
  };
  
  

  const handleRegistration = () => {
    navigation.navigate('RegistrationScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Prisijunk arba prisiregistruok!</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Tavo el. paštas"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Tavo slaptažodis"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Prisijungti</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Registruotis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#034F34',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: '#EEF0ED',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
