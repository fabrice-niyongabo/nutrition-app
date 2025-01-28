import {IAction} from '../../types/actions';
import {IUser} from '../../types/user';
import {RESET_USER, SET_TOKEN, SET_USER} from '../actions/user';

interface IUserReducer {
  user: IUser | undefined;
  token: string;
}

const initialState: IUserReducer = {
  user: undefined,
  token: '',
};

const userReducer = (
  state: IUserReducer = initialState,
  action: IAction,
): IUserReducer => {
  switch (action.type) {
    case SET_USER:
      if (action.payload) {
        return {...state, user: action.payload};
      } else {
        return state;
      }
    case SET_TOKEN:
      return {...state, token: action.payload};

    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
