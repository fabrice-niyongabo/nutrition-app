import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../screens/afterLogin/dashboard';
import RegisterChild from '../screens/afterLogin/registerChild';
import {COLORS} from '../constants/colors';
import RegisterWoman from '../screens/afterLogin/registerWoman';
import Profile from '../screens/afterLogin/profile';
import EditProfile from '../screens/afterLogin/editProfile';
import Notifications from '../screens/afterLogin/notifications';
import ChildList from '../screens/afterLogin/lists/child';
import WomenList from '../screens/afterLogin/lists/woman';
import ChildDetails from '../screens/afterLogin/childDetails';
import Prediction from '../screens/afterLogin/Prediction';
import WomanDetails from '../screens/afterLogin/womanDetails';

const Stack = createNativeStackNavigator();
const AfterLogin = () => {
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
        <Stack.Screen
          name="Women"
          component={WomenList}
          options={{
            title: 'Registered Women',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="Child"
          component={ChildList}
          options={{
            title: 'Registered Children',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="ChildDetails"
          component={ChildDetails}
          options={{
            title: 'Child Meal Recommendation',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
            // headerTransparent: true,
            // headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Prediction"
          component={Prediction}
          options={{
            title: 'Health Status Prediction',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
          }}
        />
        <Stack.Screen
          name="WomanDetails"
          component={WomanDetails}
          options={{
            title: 'Woman Meal Details',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: COLORS.green},
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AfterLogin;
