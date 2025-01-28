import {Notifier, NotifierComponents} from 'react-native-notifier';

export const toastMessage = (
  type: 'error' | 'success' | 'warn' | 'info',
  message: string,
  title: string | undefined = undefined,
) => {
  const customTitle = type.charAt(0).toUpperCase() + type.slice(1);
  Notifier.showNotification({
    // title: title ? title : customTitle,
    description: message,
    Component: NotifierComponents.Alert,
    duration: 4000,
    componentProps: {
      alertType: type,
    },
  });
};
