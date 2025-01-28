import {APP} from '../../constants/app';
import {IAction} from '../../types/actions';
import {IChild} from '../../types/children';
import {errorHandler} from '../../utils/helpers';
import axios from 'axios';
import {RootState} from '../reducers';
import {IWoman} from '../../types/women';

export const SET_WOMEN = 'SET_WOMEN';
export const SET_ISLOADING_WOMEN = 'SET_ISLOADING_WOMEN';

export const setWomen = (women: IWoman[]): IAction => ({
  type: SET_WOMEN,
  payload: women,
});

export const setIsLoadingWomen = (value: boolean): IAction => ({
  type: SET_ISLOADING_WOMEN,
  payload: value,
});

export const fetchWomen = (): any => async (dispatch: any, getState: any) => {
  const {userReducer} = getState() as RootState;
  dispatch(setIsLoadingWomen(true));
  try {
    const res = await axios.get(APP.backendUrl + '/women', {
      headers: {
        Authorization: `Bearer ${userReducer.token}`,
      },
    });
    dispatch(setWomen(res.data.women));
  } catch (error) {
    errorHandler(error);
  } finally {
    dispatch(setIsLoadingWomen(false));
  }
};
