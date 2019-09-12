import { all, fork, takeEvery, call, put, delay } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAILURE 
} from '../reducers/user';
import axios from 'axios';

function loginAPI() { // 서버에 요청을 보내는 부분
    return axios.post('/login')
}

function* login() {
    try {
        //yield call(loginAPI); // 콜백함수를 기다린다. (반대로 fork는 기다리지 않음)
        yield delay(2000)
        yield put({ // put은 dispatch의 역할을 한다.
            type: LOG_IN_SUCCESS
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login) // LOG_IN action을 받으면 login 함수를 실행한다.
}

function signUpAPI(signUpData) {
    return axios.post('http://localhost:1991/api/user/', signUpData)
}

function* signUp(action) {
    try {
        yield call(signUpAPI, action.data)
        yield put({ 
            type: SIGN_UP_SUCCESS
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: SIGN_UP_FAILURE,
            error: e
        })
    }    
}

function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp) // LOG_IN action을 받으면 login 함수를 실행한다.
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp)
    ])
}