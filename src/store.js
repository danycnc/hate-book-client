import {
  applyMiddleware,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { userSlicer } from './slicers/userDataSlicer';
import thunk from 'redux-thunk';
import { postsSlicer } from './slicers/postsSlicer';

const rootReducer = combineReducers({
  userDataSlicer: userSlicer.reducer,
  postsSlicer: postsSlicer.reducer,
});

export const store = configureStore(
  { reducer: rootReducer },
  applyMiddleware(thunk)
);

//store.dispatch(console.log(userSlicer));
