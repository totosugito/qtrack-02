//
//
import { put } from 'redux-saga/effects';

import actions from '../../../actions';

export function* openModal(type) {
    console.log('//*** sagas/core/services/modals/openModal')
    yield put(actions.openModal(type));
}

export function* closeModal() {
    console.log('//*** sagas/core/services/modals/closeModal')
    yield put(actions.closeModal());
}

export default {
    openModal,
    closeModal,
};
