import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
    userPosts:[],
   
}


const userPostsReducer = (state = initialState , action) =>{
    switch(action.type){
        case 'SET_USER_POSTS':
        return{
            ...state,
            userPosts:action.payload
        };
        case 'UPDATE_USER_POST':
        return{
            ...state ,
            userPosts : state.userPosts.map((post)=> post.id === action.payload.postId ?{...post , ...action.payload.updatedPost }: post)
        };

        case 'DELETE_USER_POST':
            return{
                ...state,
                userPosts: state.userPosts.filter((post)=>post.id !== action.payload)
            }

        case 'SAVE_COMMENTS':
            const{postId, comments} = action.payload;
            return{
                ...state,
                userPosts:state.userPosts.map((post)=> post.id === postId ? {...post , comments} : post),
            };

            case 'ADD_COMMENT':
                const { postId2, comment } = action.payload;
                const updatedPosts = state.userPosts.map((post) =>
                  post.id === postId2 ? { ...post, comments: [...post.comments, comment] } : post
                );
                return {
                  ...state,
                  userPosts: updatedPosts,
                };
            
        default:
            return state
    }
}

const persistedReducer = persistReducer(persistConfig, userPostsReducer);

export default persistedReducer;