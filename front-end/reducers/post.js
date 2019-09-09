export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'Koon',
        },
        content: 'golang을 배워봅시다!!!',
        img: 'https://miro.medium.com/max/3000/1*30aoNxlSnaYrLhBT0O1lzw.png'
    }],
    imagePath: [],
    addPostErrorReason: false,
    isAddingPost: false
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

export const LIKE_POSTS_REQUEST = "LIKE_POSTS_REQUEST";
export const LIKE_POSTS_SUCCESS = "LIKE_POSTS_SUCCESS";
export const LIKE_POSTS_FAILURE = "LIKE_POSTS_FAILURE";

export const UNLIKE_POSTS_REQUEST = "UNLIKE_POSTS_REQUEST";
export const UNLIKE_POSTS_SUCCESS = "UNLIKE_POSTS_SUCCESS";
export const UNLIKE_POSTS_FAILURE = "UNLIKE_POSTS_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

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
        case ADD_POST_REQUEST: {
            return {
                ...state
            }
        }

        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts]
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