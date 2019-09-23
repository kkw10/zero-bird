import { all, fork, takeEvery, call, put, delay } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE, 
    SIGN_UP_REQUEST, 
    SIGN_UP_SUCCESS, 
    SIGN_UP_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE

} from '../reducers/user';
import axios from 'axios';

// # 로그인 관련 로직
function loginAPI(loginData) { // 서버에 요청을 보내는 부분
    return axios.post('/api/user/login', loginData, {
        withCredentials: true
    })
    
}
function* login(action) {
    try {
        const result = yield call(loginAPI, action.data); // 콜백함수를 기다린다. (반대로 fork는 기다리지 않음)
        yield put({ // put은 dispatch의 역할을 한다.
            type: LOG_IN_SUCCESS,
            data: result.data
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

// # 회원가입 관련 로직
function signUpAPI(signUpData) {
    return axios.post('/api/user/', signUpData)
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

// # 로그아웃 관련 로직
function logOutAPI() {
    return axios.post('/api/user/logout', {}, {
        withCredentials: true
    })
}
function* logOut() {
    try {
        yield call(logOutAPI)
        yield put({ 
            type: LOG_OUT_SUCCESS
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOG_OUT_FAILURE,
            error: e
        })
    }    
}
function* watchLogOut() {
    yield takeEvery(LOG_OUT_REQUEST, logOut) // LOG_IN action을 받으면 login 함수를 실행한다.
}

// # 로그인 상태 유지 관련 로직
function loadUserAPI(userId) {
    return axios.get(
        userId 
            ? `/user/${userId}` 
            : '/api/user/', {
        withCredentials: true
    })
}
function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data)
        yield put({ 
            type: LOAD_USER_SUCCESS,
            data: result.data,
            me: !action.data
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_USER_FAILURE,
            error: e
        })
    }    
}
function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser) // LOG_IN action을 받으면 login 함수를 실행한다.
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogOut),
        fork(watchLoadUser)
    ])
}