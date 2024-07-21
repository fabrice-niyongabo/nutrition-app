import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import {StyleSheet} from 'react-native';
import colors from '../colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';
const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.green} hidden={false} />
      <ImageBackground
        source={require('../../assets/img/2.jpg')}
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}>
        <View style={{flex: 1, backgroundColor: colors.red}}>
          <View style={styles.headerContainer}>
            <View style={styles.childContainer}>
              <Icon name="fast-food" size={70} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 40,
                  fontFamily: 'cursive',
                  textTransform: 'capitalize',
                }}>
                NUTRITION IS APP
              </Text>
            </View>
          </View>
          <View style={{marginTop: 40, marginBottom: 30, alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 25}}>
              Welcome to our app
            </Text>
          </View>
          <View style={{marginHorizontal: 50}}>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Login')}>
              <View
                style={{
                  backgroundColor: colors.green,
                  padding: 10,
                  borderRadius: 50,
                  marginTop: 20,
                  marginBottom: 40,
                }}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                  LOGIN
                </Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Register')}>
              <View
                style={{
                  backgroundColor: colors.darkGreen,
                  padding: 10,
                  borderRadius: 50,
                }}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                  REGISTER
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.green,
    height: 250,
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
});

export default WelcomeScreen;
