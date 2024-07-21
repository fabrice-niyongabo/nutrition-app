import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../colors';
import Axios from 'axios';
import {backendUrl} from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = () => {
    setIsRegistering(true);
    if (email.trim() === '') {
      alert('Please enter your email address');
      setIsRegistering(false);
      emailRef.current.focus();
    } else if (password.trim() === '') {
      alert('You did not provide your password :(');
      setIsRegistering(false);
      passwordRef.current.focus();
    } else {
      Axios.post(backendUrl + 'login', {email, password})
        .then(res => {
          if (res.data.type === 'message') {
            setIsRegistering(false);
            AsyncStorage.setItem('user_email', email);
            AsyncStorage.setItem('user_names', res.data.names);
            AsyncStorage.setItem('user_type', res.data.user_type);
            RNRestart.Restart();
          } else {
            alert(`${res.data.msg}`);
            setIsRegistering(false);
            setEmail('');
          }
        })
        .catch(error => {
          alert(error);
          setIsRegistering(false);
        });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View style={styles.childContainer}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </View>
        <View style={styles.formMainContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Enter your email.."
              ref={emailRef}
              onChangeText={text => setEmail(text)}
            />
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={30} color={colors.gray} />
            </View>
          </View>
          <View style={{...styles.inputContainer, marginTop: 15}}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={password}
              placeholder="Enter your password.."
              ref={passwordRef}
              onChangeText={text => setPassword(text)}
            />
            <View style={styles.iconContainer}>
              <Icon name="lock" size={30} color={colors.gray} />
            </View>
          </View>
          {isRegistering ? (
            <View
              style={{
                backgroundColor: colors.green,
                borderRadius: 50,
                paddingVertical: 15,
                marginVertical: 15,
                opacity: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <ActivityIndicator color="white" />
              <Text style={{color: 'white'}}> Logging in ...</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{marginVertical: 15}}
              onPress={handleSubmit}>
              <View
                style={{
                  backgroundColor: colors.green,
                  borderRadius: 50,
                  paddingVertical: 15,
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>LOGIN</Text>
              </View>
            </TouchableOpacity>
          )}

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
    </KeyboardAwareScrollView>
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
