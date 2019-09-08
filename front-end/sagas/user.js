import { all, fork, takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';
import axios from 'axios';

function signUpAPI() { // 서버에 요청을 보내는 부분

}

function* signUp() {
    try {
        yield call(sigUpAPI); // 콜백함수를 기다린다. (반대로 fork는 기다리지 않음)
        yield put({ // put은 dispatch의 역할을 한다.
            type: SIGN_UP_SUCCESS
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: SIGN_UP_FAILURE
        })
    }
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp) // LOG_IN action을 받으면 login 함수를 실행한다.
}


export default function* userSaga() {
    yield all([
        fork(watchSignUp)
    ])
}