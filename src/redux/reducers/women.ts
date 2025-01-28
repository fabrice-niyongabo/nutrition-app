import {IAction} from '../../types/actions';
import {IWoman} from '../../types/women';
import {SET_ISLOADING_WOMEN, SET_WOMEN} from '../actions/women';

interface IWomanReducer {
  women: IWoman[];
  isLoading: boolean;
}

const initialState: IWomanReducer = {
  women: [],
  isLoading: false,
};

const womenReducer = (
  state: IWomanReducer = initialState,
  action: IAction,
): IWomanReducer => {
  switch (action.type) {
    case SET_WOMEN:
      return {...state, women: action.payload};
    case SET_ISLOADING_WOMEN:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default womenReducer;
