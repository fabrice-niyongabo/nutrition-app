import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Axios from 'axios';
import {backendUrl} from '../Config';

const width = Dimensions.get('window').width;

function AdminDashboard({navigation}) {
  const [childrensList, setChildrensList] = useState([]);
  const [isLoadingChildrenList, setIsLoadingChildrenList] = useState(true);
  const [womenList, setwomenList] = useState([]);
  const [isLoadingWomen, setisLoadingWomen] = useState(true);

  const [childrensFood, setChildrensFood] = useState([]);
  const [isLoadingChildrensFood, setisLoadingChildrensFood] = useState(true);

  const [womensFood, setWomensFood] = useState([]);
  const [isLoadingWomensFood, setIsLoadingWomensFood] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      Axios.get(backendUrl + 'adminChildList')
        .then(res => {
          setIsLoadingChildrenList(false);
          setChildrensList(res.data);
        })
        .catch(error => {
          // ToastAndroid.show(error.message, ToastAndroid.SHORT);
          console.log(error);
        });

      Axios.get(backendUrl + 'adminWomenList')
        .then(res => {
          setisLoadingWomen(false);
          setwomenList(res.data);
        })
        .catch(error => {
          // ToastAndroid.show(error.message, ToastAndroid.SHORT);
          console.log(error);
        });

      Axios.get(backendUrl + 'childrensFood')
        .then(res => {
          setisLoadingChildrensFood(false);
          setChildrensFood(res.data);
        })
        .catch(error => {
          // ToastAndroid.show(error.message, ToastAndroid.SHORT);
          console.log(error);
        });

      Axios.get(backendUrl + 'adminWomensFood')
        .then(res => {
          setIsLoadingWomensFood(false);
          setWomensFood(res.data);
        })
        .catch(error => {
          // ToastAndroid.show(error.message, ToastAndroid.SHORT);
          console.log(error);
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [childrensList, womenList]);
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../../assets/img/9.jpg')}
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 30, color: colors.brown}}>
              Admin Dashboard
            </Text>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Children')}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  marginVertical: 10,
                }}>
                {isLoadingChildrenList ? (
                  <ActivityIndicator size={30} color={colors.green} />
                ) : (
                  <Text style={{fontSize: 30}}>{childrensList.length}</Text>
                )}
                <Text style={{fontSize: 20}}>Children</Text>
              </View>
            </TouchableNativeFeedback>

            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                marginVertical: 10,
              }}>
              {isLoadingWomen ? (
                <ActivityIndicator size={30} color={colors.green} />
              ) : (
                <Text style={{fontSize: 30}}>{womenList.length}</Text>
              )}
              <Text style={{fontSize: 20}}>Women</Text>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                marginVertical: 10,
              }}>
              {isLoadingChildrensFood ? (
                <ActivityIndicator size={30} color={colors.green} />
              ) : (
                <Text style={{fontSize: 30}}>{childrensFood.length}</Text>
              )}
              <Text style={{fontSize: 20}}>Children's food type</Text>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                marginVertical: 10,
              }}>
              {isLoadingWomensFood ? (
                <ActivityIndicator size={30} color={colors.green} />
              ) : (
                <Text style={{fontSize: 30}}>{womensFood.length}</Text>
              )}
              <Text style={{fontSize: 20}}>Women's food type</Text>
            </View>
          </View>

          {/* bottom tab */}
          <View
            style={{
              backgroundColor: colors.green,
              bottom: 0,
              position: 'absolute',
              width,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="home" size={20} color="white" />
              <Text style={{color: 'white'}}>Home</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon name="user-o" size={20} color="white" />
                <Text style={{color: 'white'}}>Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default AdminDashboard;
