import { all, fork, takeLatest, put, delay } from 'redux-saga/effects'
import { 
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    ADD_POST_FAILURE,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE    
} from '../reducers/post';
import axios from 'axios';

// 글쓰기 관련 로직
function addPostAPI(postData) {
    return axios.post('/post', postData, {
        withCredentials: true
    })
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data)
        debugger
        console.log(result.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data
        })

    } catch(e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        })
    }
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

// 댓글 작성 관련 로직
function addCommentAPI() {
    
}
function* addComment(action) {
    try {
        yield delay(2000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId
            }
        })

    } catch(e) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        })
    }
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

// 작성된 글 가져오기 관련 로직
function loadMainPostsAPI(postData) {
    return axios.get('/posts')
}
function* loadMainPosts() {
    try {
        const result = yield call(loadMainPostsAPI)
        console.log(result.data);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data
        })

    } catch(e) {
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e,
        })
    }
}
function* watchLoadMainPosts() {
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts)
}

export default function* userSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadMainPosts)
    ])
}