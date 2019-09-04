// Initial state
export const initialState = {
    isLoggedIn: false,
    user: {},
}

// Action name
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

// Action
const loginAction = {
    type: LOG_IN,
    data: {
        nickname: 'Koon'
    }
}
const logoutAction = {
    type: LOG_OUT
}

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data
            }
        }

        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: {}
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