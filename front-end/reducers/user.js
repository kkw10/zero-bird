// dummy
const dummyUser = {     
    nickname: 'Koon',
    post: [],
    followings: [],
    followers: [],
    signUpData: {},  
}

// Initial state
export const initialState = {
    isLoggedIn: false,
    user: null
}

// Action name (Request, Success, Failure => RSF시리즈는 "비동기 요청"의 경우 사용함 : 즉 리덕스 사가가 필요함)
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAULURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SGIN_UP_FAILURE';

// (RFS시리즈가 아닌 경우에는 "동기 요청"이므로 리덕스만 사용해도 된다.)


// Action
export const loginAction = {
    type: LOG_IN_REQUEST,
    data: {
        nickname: 'Koon'
    }
}
export const logoutAction = {
    type: LOG_OUT_REQUEST
}
export const signUpAction = (data) => {
    return {
        type: SIGN_UP_REQUEST,
        data       
    }
}

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST: {
            return {
                ...state,
                loginData: action.data,
                isLoading: true,
            }
        }

        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,                
                isLoading: false,
            }
        }

        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }
        }

        case SIGN_UP_REQUEST: {
            return {
                ...state,
                signUpData: action.data
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