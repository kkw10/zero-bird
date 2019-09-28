import produce from 'immer';

export const initialState = {
    mainPosts: [],
    imagePath: [],
    addPostErrorReason: false,
    isAddingPost: false,
    postAdded: false,
    isAddingComment: false,
    addCommentErrorReason:'',
    commentAdded: false,
    singlePost: null,
}

export const ADD_DUMMY = "ADD_DUMMY";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const LOAD_MAIN_POSTS_REQUEST = "LOAD_MAIN_POSTS_REQUEST";
export const LOAD_MAIN_POSTS_SUCCESS = "LOAD_MAIN_POSTS_SUCCESS";
export const LOAD_MAIN_POSTS_FAILURE = "LOAD_MAIN_POSTS_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

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

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

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
    return produce(state, (draft) => {
        switch (action.type) {

            // 게시글 작성 관련 로직
            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addPostErrorReason = "";
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
                draft.mainPosts.unshift(action.data);
                draft.postAdded = true;
                draft.imagePath = []
                break;
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
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId)
                draft.mainPosts[postIndex].Comments.push(action.data.comment)
                draft.isAddingComment = false
                draft.commentAdded = true
                break
            }
            case ADD_COMMENT_FAILURE: {
                return {
                    ...state,
                    isAddingComment: false,
                    addCommentErrorReason: action.error,
                }
            }
    
            case LOAD_COMMENTS_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Comments = action.data.comments;
                break;
            }
    
            // 작성된 글 불러오기 관련 로직 +
            // 해시 태그 관련 글 불러 오기 로직 +
            // 특정 유저 관련 글 불러오기 로직
            case LOAD_MAIN_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_USER_POSTS_REQUEST: {
                draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
                draft.hasMorePost = action.lastId ? action.hasMorePost : true
                break;
            }
            case LOAD_MAIN_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_USER_POSTS_SUCCESS:     {
                return {
                    ...state,
                    mainPosts: state.mainPosts.concat(action.data),
                    hasMorePost: action.data.length === 10
                }
            }
            case LOAD_MAIN_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE: {
                break;
            }           
    
            // 이미지 업로드 관련 로직
            case UPLOAD_IMAGES_REQUEST: {
                break; // 아무것도 하지 않는 요청들은 break로 처리
            }
            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                    draft.imagePath.push(p)
                })
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
            }      
            
            case REMOVE_IMAGE: {
                const index = draft.imagePath.findIndex((v, i) => i === action.index);
                draft.imagePath.splice(index, 1)
                break;
            }
    
            // 좋아요 관련 로직
            case LIKE_POST_REQUEST: {
                break;
            }
            case LIKE_POST_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
                break;
            }
            case LIKE_POST_FAILURE: {
                break;
            } 
    
            // 좋아요 취소 관련 로직
            case UNLIKE_POST_REQUEST: {
                break;
            }
            case UNLIKE_POST_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex(v => v.id === action.data.postId);
                const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v => v.id === action.data.userId);
                draft.mainPosts[postIndex].Likers.splice(likeIndex, 1)
                break;
            }
            case UNLIKE_POST_FAILURE: {
                break;
            }     
            
            // 좋아요 취소 관련 로직
            case RETWEET_REQUEST: {
                break;
            }
            case RETWEET_SUCCESS: {
                return {
                    ...state,
                    mainPosts: [action.data, ...state.mainPosts]
                }
            }
            case RETWEET_FAILURE: {
                break;
            }  
            
            // 게시글 삭제 관련 로직
            case REMOVE_POST_REQUEST: {
                break;
            }
            case REMOVE_POST_SUCCESS: {
                return {
                    ...state,
                    mainPosts: state.mainPosts.filter(v => v.id !== action.data)
                }
            }
            case REMOVE_POST_FAILURE: {
                break;
            }          
    
            case LOAD_POST_REQUEST: {
                break;
            }
            case LOAD_POST_SUCCESS: {
                draft.singlePost = action.data;
                break;
            }
            case LOAD_POST_FAILURE: {
                break;
            }
    
            default: {
                break;
            }
        }
    })
}

export default reducer;