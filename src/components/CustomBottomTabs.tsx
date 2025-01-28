import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {INavigationProp} from '../types/navigation';
import {COLORS} from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

const CustomBottomTabs = ({navigation}: INavigationProp) => {
  return (
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
  );
};

export default CustomBottomTabs;
