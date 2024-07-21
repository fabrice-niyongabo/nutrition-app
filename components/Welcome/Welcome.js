import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import Login from '../Login/Login';
import Register from '../Register/Register';
import {green} from '../colors';

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
            headerShown: false,
            title: '',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerStyle: {backgroundColor: green},
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerStyle: {backgroundColor: green},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Welcome;
