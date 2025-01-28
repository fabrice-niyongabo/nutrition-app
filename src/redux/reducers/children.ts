import {IAction} from '../../types/actions';
import {IChild} from '../../types/children';
import {SET_CHILDREN, SET_ISLOADING_CHILDREN} from '../actions/children';

interface IChildrenReducer {
  children: IChild[];
  isLoading: boolean;
}

const initialState: IChildrenReducer = {
  children: [],
  isLoading: false,
};

const childrenReducer = (
  state: IChildrenReducer = initialState,
  action: IAction,
): IChildrenReducer => {
  switch (action.type) {
    case SET_CHILDREN:
      return {...state, children: action.payload};
    case SET_ISLOADING_CHILDREN:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default childrenReducer;
