import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Dimensions,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../constants/colors';
import {INavigationProp} from '../../../types/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {fetchWomen} from '../../../redux/actions/women';
import {fetchChildren} from '../../../redux/actions/children';

const width = Dimensions.get('window').width;

const Dashboard = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const womenReducer = useSelector((state: RootState) => state.womenReducer);
  const childrenReducer = useSelector(
    (state: RootState) => state.childrenReducer,
  );

  useEffect(() => {
    dispatch(fetchChildren());
    dispatch(fetchWomen());
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={COLORS.green} />
      <ImageBackground
        source={require('../../../assets/img/9.jpg')}
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
              <Text style={{fontSize: 16, color: COLORS.gray2}}>
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
                  <Icon name="female" size={30} color={COLORS.blue} />
                  {womenReducer.isLoading ? (
                    <ActivityIndicator size={30} color={COLORS.blue} />
                  ) : (
                    <Text
                      style={{
                        marginTop: 10,
                        fontWeight: 'bold',
                        fontSize: 30,
                        color: COLORS.blue,
                      }}>
                      {womenReducer.women.length}
                    </Text>
                  )}
                  <Text style={{color: COLORS.blue, fontSize: 18}}>Women</Text>
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
                  <Icon size={30} name="child" color={COLORS.brown} />
                  {childrenReducer.isLoading ? (
                    <ActivityIndicator size={30} color={COLORS.brown} />
                  ) : (
                    <Text
                      style={{
                        color: COLORS.brown,
                        fontSize: 30,
                        fontWeight: 'bold',
                        marginTop: 10,
                      }}>
                      {childrenReducer.children.length}
                    </Text>
                  )}
                  <Text style={{color: COLORS.brown}}>Children</Text>
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
                  <Text style={{textAlign: 'center', color: COLORS.brown}}>
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
                  <Text style={{textAlign: 'center', color: COLORS.blue}}>
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
              backgroundColor: COLORS.green,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="home" size={20} color="brown" />
                <Text style={{color: COLORS.brown, fontSize: 10}}>Home</Text>
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
