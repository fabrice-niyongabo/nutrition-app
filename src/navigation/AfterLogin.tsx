import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/afterLogin/dashboard';
import RegisterChild from '../screens/afterLogin/registerChild';
import {COLORS} from '../constants/colors';
import RegisterWoman from '../screens/afterLogin/registerWoman';
import Profile from '../screens/afterLogin/profile';
import EditProfile from '../screens/afterLogin/editProfile';
import Notifications from '../screens/afterLogin/notifications';

const Stack = createNativeStackNavigator();
export const AfterLogin = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShadowVisible: false}}
        initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTransparent: true,
            title: '',
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="RegisterChild"
          component={RegisterChild}
          options={{
            // headerTransparent: true,
            title: 'Register New Child',
            // headerShadowVisible: false,
            headerTintColor: 'white',
            // headerBackVisible: false,
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="RegisterWoman"
          component={RegisterWoman}
          options={{
            // headerTransparent: true,
            title: 'Register New Woman',
            // headerShadowVisible: false,
            headerTintColor: 'white',
            // headerBackVisible: false,
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="EditNames"
          component={EditProfile}
          options={{
            title: 'Edit your names',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{
            title: 'Notifications',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
