export const initialState = {
    mainPosts: []
}

export const ADD_POST = "ADD_POST";
export const ADD_DUMMY = "ADD_DUMMY";

const addPost = {
    type: ADD_POST,
}
const addDummy = {
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
        case ADD_POST: {
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