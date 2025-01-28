import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {COLORS} from '../../../constants/colors';

const Profile = ({navigation}) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userNames, setUserNames] = useState(null);
  const [gotLoginDetails, setGotLoginDetails] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      AsyncStorage.getItem('user_email').then(value => {
        if (value != null) {
          setUserEmail(value);
        }
        setGotLoginDetails(true);
      });

      AsyncStorage.getItem('user_names').then(value => {
        if (value != null) {
          setUserNames(value);
        }
      });
    }

    //cancel subscriptions
    return () => {
      isSubscribed = false;
    };
  });

  const handleLogout = () => {
    AsyncStorage.removeItem('user_email');
    AsyncStorage.removeItem('user_names');
    RNRestart.Restart();
  };
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.childContainer}>
          <View
            style={{
              width: 150,
              height: 150,
              backgroundColor: 'white',
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="user-o" size={100} />
          </View>
        </View>
      </View>
      <View style={styles.formMainContainer}>
        <View
          style={{
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>{userNames}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditNames', {names: userNames, userEmail})
            }>
            <Icon2 name="edit" size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: 15,
          }}>
          <Text>{userEmail}</Text>
        </View>
        <TouchableOpacity
          style={{marginVertical: 40}}
          onPress={() => handleLogout()}>
          <View
            style={{
              backgroundColor: COLORS.green,
              borderRadius: 50,
              paddingVertical: 15,
            }}>
            <Text style={{textAlign: 'center'}}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.green,
    height: 200,
    width: '100%',
    transform: [{scaleX: 2}],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden',
  },
  childContainer: {
    flex: 1,
    transform: [{scaleX: 0.5}],
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  loginText: {
    fontSize: 50,
    color: 'white',
  },
  formMainContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    height: 50,
  },
  input: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 3,
    paddingLeft: 40,
    height: 50,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Profile;
