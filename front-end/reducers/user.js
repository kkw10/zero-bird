// dummy
const dummyUser = {     
    id: 1,
    nickname: 'Koon',
    post: [],
    followings: [],
    followers: [],
    signUpData: {},  
}

// Initial state
export const initialState = {
    isLoggingOut: false, // 로그아웃 시도중
    isLoggingIn: false, // 로그인 시도중
    logInErrorReason: '', // 로그인 에러 사유
    isSignedUp: false, // 회원가입 성공
    isSigningUp: false, // 회원가입 시도 중
    signUpErrorReason: '', // 회원가입 실패 사유
    me: null, // 내 정보
    followingList: [],
    followerList: [],
    userInfo: null
}

// Action name (Request, Success, Failure => RSF시리즈는 "비동기 요청"의 경우 사용함 : 즉 리덕스 사가가 필요함)
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SGIN_UP_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAULURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

// (RFS시리즈가 아닌 경우에는 "동기 요청"이므로 리덕스만 사용해도 된다.)

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 로그인 관련 로직
        case LOG_IN_REQUEST: {
            return {
                ...state,
                isLoggingIn: true,
                logInErrorReason: ''
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                me: action.data,                
                isLoading: false,
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLoggingIn: false,
                logInErrorReason: action.error,
                me: null
            }
        }

        // 로그아웃 관련 로직
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggingOut: true
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                isLoggingOut: false,
                me: null
            }
        }

        // 회원가입 관련 로직
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUp: true,
                isSignedUp: false,
                signUpErrorReason: ''
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: true
            }
        }
        case SIGN_UP_FAILURE: {
            return {
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error
            }
        }      
        
        // 회원 로그 유지 관련 로직
        case LOAD_USER_REQUEST: {
            return {
                ...state
            }
        }
        case LOAD_USER_SUCCESS: {
            if(action.me) {
                return {
                    ...state,
                    me: action.data
                }
            }
            
            return {
                ...state,
                userInfo: action.data
            }
        }
        case LOAD_USER_FAILURE: {
            return {
                ...state
            }
        } 
        
        // 팔로우 관련 로직
        case FOLLOW_USER_REQUEST: {
            return {
                ...state
            }
        }
        case FOLLOW_USER_SUCCESS: {
            return {
                ...state,
                me: {
                    ...state.me,
                    Followings: [{ id: action.data }, ...state.me.Followings]
                }
            }
        }
        case FOLLOW_USER_FAILURE: {
            return {
                ...state
            }
        } 
        
        // 언팔로우 관련 로직
        case UNFOLLOW_USER_REQUEST: {
            return {
                ...state
            }
        }
        case UNFOLLOW_USER_SUCCESS: {
            return {
                ...state,
                me: {
                    ...state.me,
                    Followings: state.me.Followings.filter(v => v.id !== action.data)
                }
            }
        }
        case UNFOLLOW_USER_FAILURE: {
            return {
                ...state
            }
        }         

        case ADD_POST_TO_ME: {
            return {
                ...state,
                me: {
                    ...state.me,
                    Posts: [{id: action.data}, ...state.me.Posts]
                }
            }
        }
        
        default: {
            return {
                ...state
            };
        }
    }
}

export default reducer;