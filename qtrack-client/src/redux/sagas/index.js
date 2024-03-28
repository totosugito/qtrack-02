import { call } from 'redux-saga/effects';

import loginSaga from './login';
import coreSaga from './core';
import { getAccessToken } from '../../lib/utils/access-token-storage';

export default function* rootSaga() {
  const accessToken = yield call(getAccessToken);
  if (!accessToken) {
    yield call(loginSaga);
  }
  yield call(coreSaga);
}
