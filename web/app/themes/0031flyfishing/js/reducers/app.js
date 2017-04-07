
const initialState = {
    globals: {},
    pages: {},
    menus: {}
}

const appReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case 'APP_SET_GLOBALS':
            return {
                ...newState,
                globals: action.data
            }
            break
        case 'LOAD_CONTENT':
            return {
                ...newState,
                pages: {
                    ...newState.pages,
                    [action.data.page]: + action.data.pages
                }
            }
            break
        case 'GET_MENU':
            return {
                ...newState,
                menus: {
                    ...newState.menus,
                    [action.data.name]: action.data.menu
                }
            }
        default:
            return newState
    }
}

export default appReducer
