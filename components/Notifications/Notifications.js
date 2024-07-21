import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Axios from 'axios';
import {backendUrl} from '../Config';
import colors from '../colors';

const height = Dimensions.get('window').height;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [iseLoadingNotifications, setIseLoadingNotifications] = useState(true);
  const [gotLoginDetails, setGotLoginDetails] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const handleDelete = id => {
    Axios.post(backendUrl + 'deleteNotification', {userEmail, id})
      .then(res => {
        // console.log(res.data);
        ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
      })
      .catch(error => {
        // console.log(error);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

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

    Axios.get(backendUrl + 'notifications?userEmail=' + userEmail)
      .then(res => {
        if (isSubscribed) {
          setIseLoadingNotifications(false);
          setNotifications(res.data);
        }
      })
      .catch(err => {
        // console.log(err);
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });

    return () => (isSubscribed = false);
  }, [notifications]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 5}}>
          {iseLoadingNotifications || gotLoginDetails == false ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height,
              }}>
              <ActivityIndicator color={colors.green} size={50} />
              <Text>Getting notifications</Text>
            </View>
          ) : (
            <>
              {notifications.length == 0 ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height,
                  }}>
                  <Icon name="frown-o" size={50} color={colors.blue} />
                  <Text style={{color: colors.blue, marginTop: 10}}>
                    Nothing to show
                  </Text>
                </View>
              ) : (
                <>
                  {notifications.map((noti, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: colors.gray3,
                        marginVertical: 10,
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View style={{width: '80%'}}>
                        <Text>{noti.message}</Text>
                        <Text style={{color: '#888'}}>{noti.date}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          handleDelete(noti.id);
                        }}>
                        <View>
                          <Icon name="trash" size={30} color={colors.green} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
