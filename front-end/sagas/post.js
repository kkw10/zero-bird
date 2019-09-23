import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects'
import { 
    ADD_POST_REQUEST, 
    ADD_POST_SUCCESS, 
    ADD_POST_FAILURE,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE, 
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,        
} from '../reducers/post';
import axios from 'axios';

// 글쓰기 관련 로직
function addPostAPI(postData) {
    return axios.post('/api/post', postData, {
        withCredentials: true
    })
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data)
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
function loadMainPostsAPI() {
    return axios.get('/api/posts')
}
function* loadMainPosts() {
    try {
        const result = yield call(loadMainPostsAPI)
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

// 해시태그 관련 로직
function loadHashtagPostsAPI(tag) {
    return axios.get(`/api/hashtag/${tag}`)
}
function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data)
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data
        })

    } catch(e) {
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: e,
        })
    }
}
function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
}

// 특정 유저 글 가져오기 관련 로직
function loadUserPostsAPI(id) {
    return axios.get(`/api/${id}/posts`)
}
function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data)
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data
        })

    } catch(e) {
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: e,
        })
    }
}
function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

export default function* userSaga() {
    yield all([
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts)
    ])
}