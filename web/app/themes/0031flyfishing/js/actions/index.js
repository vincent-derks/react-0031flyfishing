export function setGlobals(globals){
    return {
        type : 'APP_SET_GLOBALS',
        data : globals
    }
}

export function getContent(content, page, pages){
    return {
        type : 'LOAD_CONTENT',
        data : {
            content,
            page,
            pages
        }
    }
}

export function getPost(content, cat, postSlug){
    return {
        type : 'GET_POST',
        data : {
            content,
            cat,
            postSlug
        }
    }
}

export function loadMoreContent(content, page){
    return {
        type: 'LOAD_MORE_CONTENT',
        data: {
            content,
            page
        }
    }
}

export function getSpots(spots){
    return {
        type: 'GET_SPOTS',
        data: { spots }
    }
}

export function getMenus(menu, name){
    return {
        type: 'GET_MENU',
        data: { menu, name }
    }
}

export function routerChange(){
    return {
        type: 'ROUTER_CHANGE'
    }
}
