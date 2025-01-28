import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../constants/colors';
import {INavigationProp} from '../../../types/navigation';
import {errorHandler, toastMessage} from '../../../utils/helpers';
import {useDispatch} from 'react-redux';
import {setToken, setUser} from '../../../redux/actions/user';
import axios from 'axios';
import {APP} from '../../../constants/app';

const Login = ({navigation}: INavigationProp) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const handleSubmit = () => {
    setIsRegistering(true);
    if (email.trim() === '') {
      toastMessage('error', 'Please enter your email address');
      setIsRegistering(false);
      emailRef?.current && emailRef.current.focus();
    } else if (password.trim() === '') {
      toastMessage('error', 'You did not provide your password :(');
      setIsRegistering(false);
      passwordRef?.current && passwordRef.current.focus();
    } else {
      axios
        .post(APP.backendUrl + '/login', {email, password})
        .then(res => {
          dispatch(setUser(res.data.user));
          dispatch(setToken(res.data.token));
        })
        .catch(error => {
          errorHandler(error);
          console.log(error);
        })
        .finally(() => {
          setIsRegistering(false);
        });
    }
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView>
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
              <Icon name="envelope" size={30} color={COLORS.gray} />
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
              <Icon name="lock" size={30} color={COLORS.gray} />
            </View>
          </View>
          {isRegistering ? (
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
              <Text style={{color: 'white'}}> Logging in ...</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{marginVertical: 15}}
              onPress={handleSubmit}>
              <View
                style={{
                  backgroundColor: COLORS.green,
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
              style={{textAlign: 'center', marginTop: 20, color: COLORS.green}}>
              Register
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
