import {Notifier, NotifierComponents} from 'react-native-notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const returnError = (error: any) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return JSON.stringify(error);
  }
};

export const toastMessage = (
  type: 'error' | 'success' | 'warn' | 'info',
  message: string,
  title: string | undefined = undefined,
) => {
  Notifier.showNotification({
    description: message,
    Component: NotifierComponents.Alert,
    duration: 4000,
    componentProps: {
      alertType: type,
    },
  });
};

export const errorHandler = (error: any) => {
  if (error?.response?.data?.message) {
    toastMessage('error', error.response.data.message);
  } else if (error.message) {
    toastMessage('error', error.message);
  } else {
    toastMessage('error', error);
  }
  handleAuthError(error);
};

export const handleAuthError = (error: any) => {
  if (error?.response?.status == 401) {
    AsyncStorage.clear();
  }
};
