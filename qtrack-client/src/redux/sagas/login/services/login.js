import { call, put } from 'redux-saga/effects';
import actions from '../../../actions';
import api from '../../../api';
import { setAccessToken } from '../../../../lib/utils/access-token-storage';

export function* initializeLogin() {
  const { item: config } = yield call(api.getConfig); // TODO: handle error
    yield put(actions.initializeLogin(config));
}

export function* authenticate(data) {
  yield put(actions.authenticate(data));

  let accessToken;
  try {
    ({ item: accessToken } = yield call(api.createAccessToken, data));
  } catch (error) {
    yield put(actions.authenticate.failure(error));
    return;
  }

  yield call(setAccessToken, accessToken);
  yield put(actions.authenticate.success(accessToken));
}

export function* clearAuthenticateError() {
  yield put(actions.clearAuthenticateError());
}

export default {
  initializeLogin,
  authenticate,
  clearAuthenticateError,
};
