import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../colors';

const Login = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.formMainContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Enter your email.." />
          <View style={styles.iconContainer}>
            <Icon name="envelope" size={30} color={colors.gray} />
          </View>
        </View>
        <View style={{...styles.inputContainer, marginTop: 15}}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Enter your password.."
          />
          <View style={styles.iconContainer}>
            <Icon name="lock" size={30} color={colors.gray} />
          </View>
        </View>
        <TouchableOpacity style={{marginVertical: 15}}>
          <View
            style={{
              backgroundColor: colors.green,
              borderRadius: 50,
              paddingVertical: 15,
            }}>
            <Text style={{textAlign: 'center'}}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{textAlign: 'center'}}>Don't have account?</Text>
          <Text
            onPress={() => {
              navigation.navigate('Register');
            }}
            style={{textAlign: 'center', marginTop: 20, color: colors.green}}>
            Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.green,
    height: 300,
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 50,
    color: 'white',
  },
  formMainContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    height: 50,
  },
  input: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 3,
    paddingLeft: 40,
    height: 50,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Login;
