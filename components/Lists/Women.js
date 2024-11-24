import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import colors from '../colors';
import Axios from 'axios';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendUrl} from '../Config';
import {returnError} from '../util';

const width = Dimensions.get('window').width;

const Women = ({navigation}) => {
  const [womens, setWomens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gotLoginDetails, setGotLoginDetails] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    AsyncStorage.getItem('user_email').then(value => {
      if (isSubscribed) {
        if (value != null) {
          setUserEmail(value);
        }
        setGotLoginDetails(true);
      }
    });

    AsyncStorage.getItem('token').then(value => {
      if (isSubscribed) {
        if (value != null) {
          setToken(value);
        }
        setGotLoginDetails(true);
      }
    });

    //cancel all subscriptions
    return () => {
      isSubscribed = false;
    };
  }, [userEmail, womens]);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(backendUrl + '/women', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => {
        setWomens(res.data.women);
      })
      .catch(error => {
        ToastAndroid.show(returnError(error), ToastAndroid.SHORT);
        // console.log(error);
        // alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const display = () => {
    if (!gotLoginDetails) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={colors.green} size="large" />
        </View>
      );
    } else if (isLoading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator color={colors.green} size="large" />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={{padding: 10, marginBottom: 100}}>
            {womens.length > 0 ? (
              womens.map(woman => {
                return (
                  <TouchableNativeFeedback
                    key={woman.id}
                    onPress={() => {
                      navigation.navigate('WomanDetails', {woman, userEmail});
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginVertical: 10,
                        backgroundColor: colors.gray3,
                        padding: 10,
                        borderRadius: 10,
                        gap: 10,
                      }}>
                      <View style={{width: 55}}>
                        <Icon name="user-circle" size={50} color="#333" />
                      </View>
                      <View style={{flex: 1}}>
                        <Text>{woman.names}</Text>
                        <Text style={{color: '#777'}}>
                          Born {woman.day}/{woman.month}/{woman.year}
                        </Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                );
              })
            ) : (
              <Text style={{color: colors.gray, fontSize: 20}}>
                No woman registered yet
              </Text>
            )}
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView>
      <View style={{position: 'relative', height: '100%'}}>
        {display()}

        {/* bottom tab */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: width,
            backgroundColor: colors.green,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="home" size={20} color="white" />
              <Text style={{color: 'white', fontSize: 10}}>Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notifications');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="bell" size={20} color="white" />
              <Text style={{color: 'white', fontSize: 10}}>Notifications</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="user" size={20} color="white" />
              <Text style={{color: 'white', fontSize: 10}}>Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Women;
