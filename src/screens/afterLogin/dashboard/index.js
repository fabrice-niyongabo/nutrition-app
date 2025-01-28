import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import PushNotification from 'react-native-push-notification';
import {backendUrl} from '../Config';
import {returnError} from '../util';

const width = Dimensions.get('window').width;

const Dashboard = ({navigation}) => {
  const [women, setWomen] = useState([]);
  const [womenMealHistory, setWomenMealHistory] = useState([]);
  const [children, setChildren] = useState([]);
  const [childrenMealHistory, setChildrenMealHistory] = useState([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);
  const [isLoadingWomen, setIsLoadingWomen] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [isShowingNotification, setIsShowingNotification] = useState(false);
  const today = new Date();

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'notification-channel',
      channelName: 'app channel',
    });
  };

  useEffect(() => {
    createChannels();
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    AsyncStorage.getItem('user_email').then(value => {
      if (isSubscribed) {
        if (value != null) {
          setUserEmail(value);
        }
      }
    });

    AsyncStorage.getItem('token').then(value => {
      if (isSubscribed) {
        if (value != null) {
          setToken(value);
        }
      }
    });

    if (token != null) {
      Axios.get(backendUrl + '/women', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          setIsLoadingWomen(false);
          setWomen(res.data.women);
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        })
        .finally(() => {
          setIsLoadingWomen(false);
        });

      Axios.get(backendUrl + '/children', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          setIsLoadingChildren(false);
          setChildren(res.data.children);
        })
        .catch(error => {
          ToastAndroid.show(returnError(error), ToastAndroid.SHORT);
        })
        .finally(() => {
          setIsLoadingChildren(false);
        });
    }

    //cancel all subscriptions
    return () => {
      isSubscribed = false;
    };
  }, [token]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.green} />
      <ImageBackground
        source={require('../../assets/img/9.jpg')}
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}>
        <View
          style={{
            backgroundColor: 'rgba(51, 197, 112, 0.739)',
            flex: 1,
            position: 'relative',
          }}>
          <View style={{marginVertical: 30, paddingHorizontal: 25}}>
            <Text style={{fontSize: 25, fontWeight: '700', color: 'white'}}>
              Dashboard
            </Text>
            <View
              style={{
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, color: colors.gray2}}>
                Welcome to the world of nutrients!
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate('Women');
                }}>
                <View
                  style={{
                    height: 120,
                    backgroundColor: 'lightblue',
                    width: '48%',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="female" size={30} color={colors.blue} />
                  {isLoadingWomen ? (
                    <ActivityIndicator size={30} color={colors.blue} />
                  ) : (
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: colors.blue,
                      }}>
                      {women.length}
                    </Text>
                  )}
                  <Text style={{color: colors.blue, fontSize: 18}}>Women</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                onPress={() => {
                  navigation.navigate('Child');
                }}>
                <View
                  style={{
                    height: 120,
                    backgroundColor: 'snow',
                    width: '48%',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon size={30} name="child" color={colors.brown} />
                  {isLoadingChildren ? (
                    <ActivityIndicator size={30} color={colors.brown} />
                  ) : (
                    <Text
                      style={{
                        color: colors.brown,
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginTop: 10,
                      }}>
                      {children.length}
                    </Text>
                  )}
                  <Text style={{color: colors.brown}}>Children</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{marginTop: 25}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RegisterChild');
                }}>
                <View
                  style={{
                    backgroundColor: 'snow',
                    padding: 15,
                    borderRadius: 7,
                  }}>
                  <Text style={{textAlign: 'center', color: colors.brown}}>
                    Register Child
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => navigation.navigate('RegisterWoman')}>
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    borderRadius: 7,
                    padding: 15,
                  }}>
                  <Text style={{textAlign: 'center', color: colors.blue}}>
                    Register Woman
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

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
            <TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="home" size={20} color="brown" />
                <Text style={{color: colors.brown, fontSize: 10}}>Home</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notifications');
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="bell" size={20} color="white" />
                <Text style={{color: 'white', fontSize: 10}}>
                  Notifications
                </Text>
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Dashboard;
