import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';
import {INavigationProp} from '../../../types/navigation';
import {COLORS} from '../../../constants/colors';
import {errorHandler, toastMessage} from '../../../utils/helpers';
import {APP} from '../../../constants/app';

const Register = ({navigation}: INavigationProp) => {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const namesRef = useRef(null);

  const registerButton = () => {
    if (isRegistering) {
      return (
        <View
          style={{
            backgroundColor: COLORS.green,
            borderRadius: 50,
            paddingVertical: 15,
            marginVertical: 15,
            opacity: 0.7,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator color="white" />
          <Text style={{color: 'white'}}> Registering ...</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={{marginVertical: 15}} onPress={handleSubmit}>
          <View
            style={{
              backgroundColor: COLORS.green,
              borderRadius: 50,
              paddingVertical: 15,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>REGISTER</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const handleSubmit = () => {
    setIsRegistering(true);
    if (names.trim() === '') {
      toastMessage('error', 'Please enter your names correctly');
      setIsRegistering(false);
    } else if (email.trim() === '') {
      toastMessage('error', 'Please enter your email address');
      setIsRegistering(false);
    } else if (password.trim() === '') {
      toastMessage('error', 'You did not provide your password :(');
      setIsRegistering(false);
    } else if (password.length <= 3) {
      toastMessage('error', 'Password must be atleast 4 characters');
      setIsRegistering(false);
      setConfirmPassword('');
      setPassword('');
    } else if (password !== confirmPassword) {
      toastMessage('error', 'Passwords do not match!');
      setIsRegistering(false);
      setConfirmPassword('');
      setPassword('');
    } else {
      Axios.post(APP.backendUrl + '/register', {
        email,
        password,
        names,
      })
        .then(res => {
          toastMessage('error', 'Registration successful');
          navigation.navigate('Login');
        })
        .catch(error => {
          errorHandler(error);
        })
        .finally(() => {
          setIsRegistering(false);
        });
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.childContainer}>
            <Text style={styles.loginText}>Register</Text>
          </View>
        </View>
        <View style={styles.formMainContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={names}
              onChangeText={e => {
                setNames(e);
              }}
              style={styles.input}
              placeholder="Enter your Names.."
              ref={namesRef}
            />
            <View style={styles.iconContainer}>
              <Icon name="user" size={30} color={COLORS.gray} />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={e => setEmail(e)}
              style={styles.input}
              placeholder="Enter your email.."
              value={email}
            />
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={20} color={COLORS.gray} />
            </View>
          </View>
          <View style={{...styles.inputContainer, marginTop: 15}}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password.."
              onChangeText={e => setPassword(e)}
              value={password}
            />
            <View style={styles.iconContainer}>
              <Icon name="lock" size={30} color={COLORS.gray} />
            </View>
          </View>
          <View style={{...styles.inputContainer, marginTop: 15}}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm password.."
              onChangeText={e => setConfirmPassword(e)}
              value={confirmPassword}
            />
            <View style={styles.iconContainer}>
              <Icon name="lock" size={30} color={COLORS.gray} />
            </View>
          </View>
          {registerButton()}
          <View>
            <Text style={{textAlign: 'center'}}>Already have account?</Text>
            <Text
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={{textAlign: 'center', marginTop: 20, color: COLORS.green}}>
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.green,
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
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 2,
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

export default Register;
