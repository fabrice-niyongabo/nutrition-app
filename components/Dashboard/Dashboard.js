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

const width = Dimensions.get('window').width;

const Dashboard = ({navigation}) => {
  const [women, setWomen] = useState([]);
  const [womenMealHistory, setWomenMealHistory] = useState([]);
  const [children, setChildren] = useState([]);
  const [childrenMealHistory, setChildrenMealHistory] = useState([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);
  const [isLoadingWomen, setIsLoadingWomen] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
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

    if (userEmail != null) {
      Axios.get(backendUrl + 'wemenList?userEmail=' + userEmail)
        .then(res => {
          if (isSubscribed) {
            setIsLoadingWomen(false);
            setWomen(res.data);
          }
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          // console.log(error);
          // alert(error);
        });

      Axios.post(backendUrl + 'getAllMealHistory', {
        email: userEmail,
        personType: 'child',
      })
        .then(res => {
          if (isSubscribed) {
            setChildrenMealHistory(res.data);
            handleChildrensMealHistory();
          }
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          // console.log(error);
          // alert(error);
        });

      Axios.post(backendUrl + 'getAllMealHistory', {
        email: userEmail,
        personType: 'woman',
      })
        .then(res => {
          if (isSubscribed) {
            setWomenMealHistory(res.data);
            handleWomenMealHistory();
          }
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          // console.log(error);
          // alert(error);
        });

      Axios.get(backendUrl + 'childList?userEmail=' + userEmail)
        .then(res => {
          if (isSubscribed) {
            setIsLoadingChildren(false);
            setChildren(res.data);
          }
        })
        .catch(error => {
          // console.log(error);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    }

    //cancel all subscriptions
    return () => (isSubscribed = false);
  }, [userEmail, women]);

  const handleChildrensMealHistory = () => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let today = mm + '/' + dd + '/' + yyyy;

    if (childrenMealHistory.length > 0) {
      for (let i = 0; i < childrenMealHistory.length; i++) {
        let valueStart = childrenMealHistory[i].time_for_meal_taken + ':00:00';
        let valueStop = date.getHours() + ':00:00';
        var timeStart = new Date(today + ' ' + valueStart).getHours();
        var timeEnd = new Date(today + ' ' + valueStop).getHours();
        const hourDiff = timeEnd - timeStart;

        if (childrenMealHistory[i].date_for_meal != today) {
          //send notification
          if (!isShowingNotification && childrenMealHistory[i].shown == false) {
            showChildNotifications(
              childrenMealHistory[i].person_id,
              childrenMealHistory[i].date_for_meal,
            );
          }
        } else {
          if (
            (hourDiff > 1 && childrenMealHistory[i].shown == 'false') ||
            (timeStart > timeEnd && childrenMealHistory[i].shown == 'false')
          ) {
            //show notification
            showChildNotifications(childrenMealHistory[i].person_id);
          }
        }
      }
    }
  };

  const handleWomenMealHistory = () => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let today = mm + '/' + dd + '/' + yyyy;

    if (womenMealHistory.length > 0) {
      for (let i = 0; i < womenMealHistory.length; i++) {
        let valueStart = womenMealHistory[i].time_for_meal_taken + ':00:00';
        let valueStop = date.getHours() + ':00:00';
        var timeStart = new Date(today + ' ' + valueStart).getHours();
        var timeEnd = new Date(today + ' ' + valueStop).getHours();
        const hourDiff = timeEnd - timeStart;

        if (womenMealHistory[i].date_for_meal != today) {
          //send notification
          if (!isShowingNotification && womenMealHistory[i].shown == 'false') {
            showWomanNotifications(
              womenMealHistory[i].person_id,
              womenMealHistory[i].date_for_meal,
            );
            break;
          }
        } else {
          if (
            (hourDiff > 1 && womenMealHistory[i].shown == 'false') ||
            (timeStart > timeEnd && womenMealHistory[i].shown == 'false')
          ) {
            //show notification
            if (!isShowingNotification) {
              showWomanNotifications(womenMealHistory[i].person_id);
              break;
            }
          }
        }
      }
    }
  };

  const showChildNotifications = (childId, lastDate = '') => {
    setIsShowingNotification(true);
    let names;
    for (let i = 0; i < children.length; i++) {
      if (children[i].id == childId) {
        names = children[i].names;
        break;
      }
    }

    if (lastDate != '') {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: 'Meal reminder!',
        message: `Its time to take meal!`,
        bigText: `It is been a long time for ${names} without taking health meal. Please come and see what you have to prepare.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    } else {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: `${names} is now ready to take meal!`,
        message: `${names} must be hungry! come and see what to prepare`,
        bigText: `The time for ${names} to take meal has come.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    }

    Axios.post(backendUrl + 'updateNotificationShow', {
      email: userEmail,
      personType: 'child',
      personId: childId,
      names: names,
    })
      .then(() => {
        setIsShowingNotification(false);
      })
      .catch(error => {
        // console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setIsShowingNotification(false);
      });
  };

  const showWomanNotifications = (childId, lastDate = '') => {
    setIsShowingNotification(true);
    let names;
    for (let i = 0; i < women.length; i++) {
      if (women[i].id == childId) {
        names = women[i].names;
        break;
      }
    }

    if (lastDate != '') {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: 'Meal reminder!',
        message: `Its time to take meal!`,
        bigText: `It is been a long time for ${names} without taking health meal. Please come and see what you have to prepare.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    } else {
      PushNotification.localNotification({
        channelId: 'notification-channel',
        title: `${names} is now ready to take meal!`,
        message: `${names} must be hungry! come and see what to prepare`,
        bigText: `The time for ${names} to take meal has come.`,
        allowWhileIdle: true,
        vibrate: true,
      });
    }

    Axios.post(backendUrl + 'updateNotificationShow', {
      email: userEmail,
      personType: 'woman',
      personId: childId,
      names: names,
    })
      .then(() => {
        setIsShowingNotification(false);
      })
      .catch(error => {
        // console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        setIsShowingNotification(false);
      });
  };

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
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={() => navigation.navigate('Deseases')}>
                <View
                  style={{
                    backgroundColor: 'lightblue',
                    borderRadius: 7,
                    padding: 15,
                  }}>
                  <Text style={{textAlign: 'center', color: colors.blue}}>
                    Person with blood pressure or diabete
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.gray2,
              flex: 1,
              borderTopEndRadius: 40,
              borderTopStartRadius: 40,
              paddingHorizontal: 25,
              paddingVertical: 25,
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 20,
                color: '#333',
                marginBottom: 20,
              }}>
              Registered Children/Women
            </Text>
            {/* Children rows */}
            {children.length === 0 && women.length === 0 ? (
              <Text>
                You have to register child or a woman and start taking meals
              </Text>
            ) : (
              <View style={{height: 60}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {children.map((child, index) => (
                    <TouchableNativeFeedback
                      key={index}
                      onPress={() => {
                        navigation.navigate('ChildDetails', {child, userEmail});
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <View>
                          <Icon name="user-circle" size={50} color="#777" />
                        </View>
                        <View
                          style={{
                            width: '65%',
                            paddingHorizontal: 5,
                          }}>
                          <Text style={{color: '#777'}}>{child.names}</Text>
                          <Text style={{color: '#777'}}>
                            Born {child.day}/{child.month}/{child.year}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text>
                            {child.year < today.getFullYear()
                              ? 'Age'
                              : 'Months'}
                          </Text>
                          {today.getFullYear() - child.year > 0 ? (
                            <Text>{today.getFullYear() - child.year}</Text>
                          ) : (
                            <Text>{today.getMonth() - child.month}</Text>
                          )}
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  ))}
                  {women.map((woman, index) => (
                    <TouchableNativeFeedback
                      key={index}
                      onPress={() => {
                        navigation.navigate('WomanDetails', {woman, userEmail});
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <View>
                          <Icon name="user-circle" size={50} color="#777" />
                        </View>
                        <View
                          style={{
                            width: '65%',
                            paddingHorizontal: 5,
                          }}>
                          <Text style={{color: '#777'}}>{woman.names}</Text>
                          <Text style={{color: '#777'}}>
                            Born {woman.day}/{woman.month}/{woman.year}
                          </Text>
                        </View>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text>Age</Text>
                          <Text>{today.getFullYear() - woman.year}</Text>
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  ))}
                </ScrollView>
              </View>
            )}
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
