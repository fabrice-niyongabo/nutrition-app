import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import {backendUrl} from '../../Config';
import colors from '../../colors';

function Children({navigation}) {
  const [childrensList, setChildrensList] = useState([]);
  const [isLoadingChildrenList, setIsLoadingChildrenList] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      Axios.get(backendUrl + 'adminChildList')
        .then(res => {
          setIsLoadingChildrenList(false);
          setChildrensList(res.data);
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
}

export default Children;
