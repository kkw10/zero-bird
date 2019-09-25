export const initialState = {
    mainPosts: [],
    imagePath: [],
    addPostErrorReason: false,
    isAddingPost: false,
    postAdded: false,
    isAddingComment: false,
    addCommentErrorReason:'',
    commentAdded: false,
}

export const ADD_DUMMY = "ADD_DUMMY";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const LOAD_MAIN_POSTS_REQUEST = "LOAD_MAIN_POSTS_REQUEST";
export const LOAD_MAIN_POSTS_SUCCESS = "LOAD_MAIN_POSTS_SUCCESS";
export const LOAD_MAIN_POSTS_FAILURE = "LOAD_MAIN_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST";
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const REMOVE_POSTS_REQUEST = "REMOVE_POSTS_REQUEST";
export const REMOVE_POSTS_SUCCESS = "REMOVE_POSTS_SUCCESS";
export const REMOVE_POSTS_FAILURE = "REMOVE_POSTS_FAILURE";

export const addPost = {
    type: ADD_POST_REQUEST,
}
export const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: 'Koon'
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 게시글 작성 관련 로직
        case ADD_POST_REQUEST: {
            return {
                ...state,
                isAddingPost: true,
                addPostErrorReason: '',
                postAdded: false,
            }
        }
        case ADD_POST_SUCCESS: {
            return {
                ...state,
                isAddingPost: false,
                mainPosts: [action.data, ...state.mainPosts],
                postAdded: true,
                imagePath: []
            }
        }
        case ADD_POST_FAILURE: {
            return {
                ...state,
                isAddingPost: false,
                addPostErrorReason: action.error
            }
        }        

        // 댓글 작성 관련 로직
        case ADD_COMMENT_REQUEST: {
            return {
                ...state,
                isAddingComment: true,
                addCommentErrorReason: '',
                commentAdded: false,
            }
        }
        case ADD_COMMENT_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId)
            const post = state.mainPosts[postIndex]
            const Comments = [...post.Comments, action.data.comment];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Comments }

            return {
                ...state,
                isAddingComment: false,
                mainPosts,
                commentAdded: true,
            }
        }
        case ADD_COMMENT_FAILURE: {
            return {
                ...state,
                isAddingComment: false,
                addCommentErrorReason: action.error,
            }
        }

        case LOAD_COMMENTS_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Comments = action.data.comments;
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Comments }

            return {
                ...state,
                mainPosts
            }
        }

        // 작성된 글 불러오기 관련 로직 +
        // 해시 태그 관련 글 불러 오기 로직 +
        // 특정 유저 관련 글 불러오기 로직
        case LOAD_MAIN_POSTS_REQUEST:
        case LOAD_HASHTAG_POSTS_REQUEST:
        case LOAD_USER_POSTS_REQUEST: {
            return {
                ...state,
                mainPosts: []
            }
        }
        case LOAD_MAIN_POSTS_SUCCESS:
        case LOAD_HASHTAG_POSTS_SUCCESS:
        case LOAD_USER_POSTS_SUCCESS:     {
            console.log(action.data)
            return {
                ...state,
                mainPosts: action.data
            }
        }
        case LOAD_MAIN_POSTS_FAILURE:
        case LOAD_HASHTAG_POSTS_FAILURE:
        case LOAD_USER_POSTS_FAILURE: {
            return {
                ...state,
            }
        }           

        // 이미지 업로드 관련 로직
        case UPLOAD_IMAGES_REQUEST: {
            return {
                ...state,
            }
        }
        case UPLOAD_IMAGES_SUCCESS: {
            return {
                ...state,
                imagePath: [...state.imagePath, ...action.data]
            }
        }
        case UPLOAD_IMAGES_FAILURE: {
            return {
                ...state
            }
        }      
        
        case REMOVE_IMAGE: {
            return {
                ...state,
                imagePath: state.imagePath.filter((v, i) => i !== action.index)
            }
        }

        // 좋아요 관련 로직
        case LIKE_POST_REQUEST: {
            return {
                ...state,
            }
        }
        case LIKE_POST_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = [{ id: action.data.userId }, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };
            return {
                ...state,
                mainPosts
            }
        }
        case LIKE_POST_FAILURE: {
            return {
                ...state,
            }
        } 

        // 좋아요 취소 관련 로직
        case UNLIKE_POST_REQUEST: {
            return {
                ...state,
            }
        }
        case UNLIKE_POST_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(v => v.id !== action.data.userId);
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = { ...post, Likers };

            return {
                ...state,
                mainPosts
            }
        }
        case UNLIKE_POST_FAILURE: {
            return {
                ...state,
            }
        }         

        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [addDummy, ...state.mainPosts]
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;