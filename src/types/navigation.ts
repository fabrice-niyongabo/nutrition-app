import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface INavigationProp {
  navigation: StackNavigationProp<any>;
  route?: RouteProp<any>;
}
export interface INavigationPropWithRouteRequired {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
}
