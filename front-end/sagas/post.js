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
    LOAD_COMMENTS_REQUEST,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,  
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,       
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,      
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,        
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,        
} from '../reducers/post';
import axios from 'axios';
import { ADD_POST_TO_ME } from '../reducers/user';

// 글쓰기 관련 로직
function addPostAPI(postData) {
    return axios.post('/api/post', postData, {
        withCredentials: true
    })
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data)
        yield put({ // post reducer의 데이터를 수정
            type: ADD_POST_SUCCESS,
            data: result.data
        })

        yield put({ // user reducer의 데이터를 수정
            type: ADD_POST_TO_ME,
            data: result.data.id
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
function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, { content: data.content }, {
        withCredentials: true,
    })
}
function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                comment: result.data
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

// 작성된 댓글 가져오기 관련 로직
function loadCommentsAPI(postId) {
    return axios.get(`/api/post/${postId}/comments`)
}
function* loadComments(action) {
    try {
        const result = yield call(loadCommentsAPI, action.data)
        yield put({
            type: LOAD_COMMENTS_SUCCESS,
            data: {
                postId: action.data,
                comments: result.data
            }
        })

    } catch(e) {
        yield put({
            type: LOAD_COMMENTS_FAILURE,
            error: e,
        })
    }
}
function* watchLoadComments() {
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments)
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
    return axios.get(`/api/hashtag/${encodeURIComponent(tag)}`)
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
    return axios.get(`/api/user/${id || 0}/posts`)
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

// 이미지 전송하기 관련 로직
function uploadImagesAPI(formData) {
    return axios.post(`/api/post/images`, formData, {
        withCredentials: true
    })
}
function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data)
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data
        })

    } catch(e) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e,
        })
    }
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

// 좋아요 관련 로직
function likePostAPI(postId) {
    return axios.post(`/api/post/${postId}/like`, {}, {
        withCredentials: true
    })
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data)
        yield put({
            type: LIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId
            }
        })

    } catch(e) {
        yield put({
            type: LIKE_POST_FAILURE,
            error: e,
        })
    }
}
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost)
}

// 좋아요 취소 관련 로직
function unlikePostAPI(postId) {
    return axios.delete(`/api/post/${postId}/like`, {
        withCredentials: true
    })
}
function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data)
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId                
            }
        })

    } catch(e) {
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: e,
        })
    }
}
function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

// 리트윗 관련 로직
function retweetAPI(postId) {
    return axios.post(`/api/post/${postId}/retweet`, {}, {
        withCredentials: true
    })
}
function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data)
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data
        })

    } catch(e) {
        yield put({
            type: RETWEET_FAILURE,
            error: e,
        })
        alert(e.response && e.response.data)
    }
}
function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet)
}

export default function* postSaga() {
    yield all([
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchLoadHashtagPosts),
        fork(watchLoadUserPosts),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchRetweet)
    ])
}