const initialState = {
    content: {
        singles: {
            pages: []
        },
        spots: []
    }
}

const contentReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case 'LOAD_CONTENT':
            return {
                ...newState,
                content : {
                    ...newState.content,
                    [action.data.page] : [
                        action.data.content
                    ]
                }
            }
            break
        case 'GET_POST':
            return {
                ...newState,
                content: {
                    ...newState.content,
                    singles: {
                        ...newState.content.singles,
                        [action.data.cat] : {
                            ...newState.content.singles[action.data.cat],
                            [action.data.postSlug] : action.data.content
                        }
                    },
                }
            }
            break
        case 'LOAD_MORE_CONTENT':
            return {
                ...newState,
                content: {
                    ...newState.content,
                    [action.data.page] : [
                        ...newState.content[action.data.page],
                        action.data.content
                    ]
                }
            }
            break
        case 'GET_SPOTS':
            return {
                ...newState,
                content: {
                    ...newState.content,
                    spots: action.data.spots
                }
            }
        default:
            return {...state}
    }
}

export default contentReducer
