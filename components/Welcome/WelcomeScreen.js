import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Icon name="spoon" size={100} color="white" />
        </View>
      </View>
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{color: colors.blue, fontSize: 30}}>
          NUTRITION MIS APP
        </Text>
      </View>
      <View style={{marginHorizontal: 50}}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View
            style={{
              backgroundColor: colors.green,
              padding: 10,
              borderRadius: 50,
              marginVertical: 20,
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>
              LOGIN
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View
            style={{
              backgroundColor: colors.darkGreen,
              padding: 10,
              borderRadius: 50,
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>
              REGISTER
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.green,
    width: 170,
    height: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

export default WelcomeScreen;
