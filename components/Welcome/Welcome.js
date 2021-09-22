import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Stack = createNativeStackNavigator();

const Welcome = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Welcome;
