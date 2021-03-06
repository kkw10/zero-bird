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
    LOG_OUT_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,    
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,    
    EDIT_NICKNAME_REQUEST,
    EDIT_NICKNAME_SUCCESS,
    EDIT_NICKNAME_FAILURE,    
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
            ? `/api/user/${userId}`  
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

// # 팔로우 관련 로직
function followAPI(userId) {
    return axios.post(`/api/user/${userId}/follow`, {}, {
        withCredentials: true
    })
}
function* follow(action) {
    try {
        const result = yield call(followAPI, action.data)
        yield put({ 
            type: FOLLOW_USER_SUCCESS,
            data: result.data
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: e
        })
    }    
}
function* watchFollow() {
    yield takeEvery(FOLLOW_USER_REQUEST, follow) // LOG_IN action을 받으면 login 함수를 실행한다.
}

// # 언팔로우 관련 로직
function unfollowAPI(userId) {
    return axios.delete(`/api/user/${userId}/follow`, {
        withCredentials: true
    })
}
function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.data)
        yield put({ 
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e
        })
    }    
}
function* watchUnfollow() {
    yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow) // LOG_IN action을 받으면 login 함수를 실행한다.
}

// # 팔로우 목록 불러오기 관련 로직
function loadFollowersAPI(userId, offset = 0, limit = 3) {
    return axios.get(`/api/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`, {
        withCredentials: true
    })
}
function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data, action.offset)
        yield put({ 
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: e
        })
    }    
}
function* watchLoadFollowers() {
    yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers) // LOG_IN action을 받으면 login 함수를 실행한다.
}

// # 팔로잉 목록 불러오기 관련 로직
function loadFollowingsAPI(userId, offset = 0, limit = 3) {
    return axios.get(`/api/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`, {
        withCredentials: true
    })
}
function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data, action.offset)
        yield put({ 
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e
        })
    }    
}
function* watchLoadFollowings() {
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings) // LOG_IN action을 받으면 login 함수를 실행한다.
}

// # 팔로워 제거하기 관련 로직
function removeFollowerAPI(userId) {
    return axios.delete(`/api/user/${userId}/follower`, {
        withCredentials: true
    })
}
function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data)
        yield put({ 
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e
        })
    }    
}
function* watchRemoveFollower() {
    yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower) // LOG_IN action을 받으면 login 함수를 실행한다.
}

// # 닉네임 수정하기 관련 로직
function editNicknameAPI(nickname) {
    return axios.patch(`/api/user/nickname`, { nickname }, {
        withCredentials: true
    })
}
function* editNickname(action) {
    try {
        const result = yield call(editNicknameAPI, action.data)
        yield put({ 
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: e
        })
    }    
}
function* watchEditNickname() {
    yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname) // LOG_IN action을 받으면 login 함수를 실행한다.
}



export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname)
    ])
}