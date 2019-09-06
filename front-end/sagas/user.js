import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user'

function loginAPI() { // 서버에 요청을 보내는 부분

}

function* login() {
    try {
        yield call(loginAPI);
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
    yield takeLatest(LOG_IN, login) // LOG_IN action을 받으면 login 함수를 실행한다.
}

export default function* userSaga() {
    yield all([
        fork(watchLogin)
    ])
}