export const initialState = {
    blogData: [],
    list:[],
    headerdata:{
        title:'',
        time:null
    },
    read:0,
    services:null,
    user:null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                user:action.user,
            };
        case 'REMOVE_USER':
            return {
                ...state,
                user:null,
            };
        case 'ADD_READTIME':
            return {
                ...state,
                read :state.read + parseInt(action.read),
            };

        case 'ADD_BLOGDATA':
            return {
                ...state,
                blogData : [...state.blogData,action.data],
            };
        case 'DELETE_BLOGDATA':
            return {
                ...state,
                blogData : [],
            }
        case 'ADD_BLOGDATA_TITLE':
            return {
                ...state,
                headerdata : action.data,
            };
        case 'ADD_BLOGDATA_LIST':
            return {
                ...state,
                list : [...state.list,action.data],
            };

        case 'REMOVE_BLOGDATA_LIST':
            return {
                ...state,
                list : [],
            };
        case 'INITIALISE_SERVICES':
            console.log(state.services)
            return{
                ...state,
                services:action.servicedata,
                displaydata:action.servicedata[0],
            }
        case 'ADD_SERVICES':
            return {
                ...state,
                services:[...state.services,action.servicedata],
            }
        case 'ADD_NEW_SERVICES':
            return{
                ...state,
                services:[...state.services,action.servicedata],
            }
        case 'SET_SERVICE_TEXT':
            return {
                ...state,
                displaydata:action.displaydata,
            }
        default:
            return state;
    }
}
export default reducer;