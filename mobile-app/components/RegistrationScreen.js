import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegistrationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = '';

  const handleRegistration = async () => {
    console.log(`Registering with name: ${name}, email: ${email}, username: ${username}, and password: ${password}`);
    // Perform registration logic here
    try {
      const response = await fetch('http://16.171.43.32:7000/userRegister/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Handle successful registration, navigate to the next screen, etc.
      const registeredUser = await response.json();
      navigation.navigate('ProfileLoggedScreen', { user: registeredUser });
      navigation.navigate('Home', { user: registeredUser });
    } catch (error) {
      console.error('Error:', error);
      // Handle registration error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Registruokis</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Tavo vardas"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Tavo slaptažodis"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Tavo el. pašto adresas"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Tavo naudotojo vardas"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
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
  },
  buttonText: {
    color: '#EEF0ED',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
