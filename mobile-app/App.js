import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import FilterScreen from './components/FilterScreen';
import ProfileScreen from './components/ProfileScreen';
import FavoriteScreen from './components/FavouriteScreen';
import MapsScreen from './components/Maps';

const colors = {
  top: "#034F34",
  text: '#00000',
  buttonText: '#EEF0ED',
  background: '#FCF5ED', 
  button: '#034F34',
  bottom: "#B28E7C",
};

const images = [
  {
    id: '1',
    title: 'Sunset',
    uri: 'https://images.unsplash.com/photo-1478564988028-ce6aeebbccc2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3Vuc2V0JTIwbGFzdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'A beautiful sunset over the ocean.',
  },
  {
    id: '2',
    title: 'Mountain',
    uri: 'https://images.unsplash.com/photo-1533638727518-5a941d0a59b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBzdGF0aXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'A mountain peak covered in snow.',
  },
  {
    id: '3',
    title: 'Beach',
    uri: 'https://images.unsplash.com/photo-1543149586-2f55d23f4644?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBzdGF0aXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    description: 'A beautiful beach with clear blue water.',
  },
];

function HomeScreen({ navigation }) {
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('Filter', { category: 'Food' })}
        >
          <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('Filter', { category: 'Museums' })}
        >
          <Text style={styles.buttonText}>Museums</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => navigation.navigate('Filter', { category: 'Entertainment' })}
        >
          <Text style={styles.buttonText}>Entertainment</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item.uri }} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Details', { item })}
            >
              View details
            </Text>
          </View>
        )}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.uri }} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.details}>Enter details here:</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();



function MyTabs() {
  return (
    <Tab.Navigator style={styles.navigator}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'information-circle'
            : 'information-circle-outline';
        } else if (route.name === 'Filter') {
          iconName = focused 
          ? 'filter' 
          : 'filter-outline';
        } else if (route.name === 'Profile') {
          iconName = focused 
          ? 'body-sharp' 
          : 'body-outline';
        } else if (route.name === 'Favorite') {
          iconName = focused 
          ? 'bookmark' 
          : 'bookmark-outline';
        } else if (route.name === 'Maps'){
          iconName = focused 
          ? 'md-map'
          : 'md-map-outline';
        }
        
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: colors.button,
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarBadge:3}}/>
      <Tab.Screen name="Filter" component={FilterScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Maps" component={MapsScreen}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          style={styles.navigator}
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
          />
        <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
        </NavigationContainer>
        );
}
          
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    margin: 10,
    alignItems: 'center',
    },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  details: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.button,
    marginHorizontal: 3,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigator: {
    backgroundColor: colors.bottom,
  }
});

/*export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
