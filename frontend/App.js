/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Auth from './src/screens/Auth'
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Home from './src/screens/Home'
import Chat from './src/screens/Chat'


const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" options={{ headerShown: true, headerStyle: { backgroundColor: '#fbffed' } }} component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

