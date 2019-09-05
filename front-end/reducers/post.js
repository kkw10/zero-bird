export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'Koon',
        },
        content: 'golang을 배워봅시다!!!',
        img: 'https://miro.medium.com/max/3000/1*30aoNxlSnaYrLhBT0O1lzw.png'
    }],
    imagePath: []
}

export const ADD_POST = "ADD_POST";
export const ADD_DUMMY = "ADD_DUMMY";

export const addPost = {
    type: ADD_POST,
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