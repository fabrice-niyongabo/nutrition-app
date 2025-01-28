import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {COLORS} from '../../../constants/colors';
import {INavigationProp} from '../../../types/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {setChildren} from '../../../redux/actions/children';
import {setWomen} from '../../../redux/actions/women';
import {resetUser} from '../../../redux/actions/user';

const Profile = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.userReducer);

  const handleLogout = () => {
    dispatch(setChildren([]));
    dispatch(setWomen([]));
    dispatch(resetUser());
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
          <Text>{user?.names}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditNames')}>
            <Icon2 name="edit" size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: 15,
          }}>
          <Text>{user?.email}</Text>
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
