import {APP} from '../../constants/app';
import {IAction} from '../../types/actions';
import {IChild} from '../../types/children';
import {errorHandler} from '../../utils/helpers';
import axios from 'axios';
import {RootState} from '../reducers';

export const SET_CHILDREN = 'SET_CHILDREN';
export const SET_ISLOADING_CHILDREN = 'SET_ISLOADING_CHILDREN';

export const setChildren = (children: IChild[]): IAction => ({
  type: SET_CHILDREN,
  payload: children,
});

export const setIsLoadingChildren = (value: boolean): IAction => ({
  type: SET_ISLOADING_CHILDREN,
  payload: value,
});

export const fetchChildren =
  (): any => async (dispatch: any, getState: any) => {
    const {userReducer} = getState() as RootState;
    dispatch(setIsLoadingChildren(true));
    try {
      const res = await axios.get(APP.backendUrl + '/children', {
        headers: {
          Authorization: `Bearer ${userReducer.token}`,
        },
      });
      dispatch(setChildren(res.data.children));
    } catch (error) {
      errorHandler(error);
    } finally {
      dispatch(setIsLoadingChildren(false));
    }
  };
