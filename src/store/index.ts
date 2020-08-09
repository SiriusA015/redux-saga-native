import saga from 'redux-saga';
import { all, fork } from 'redux-saga/effects'

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { watchUserSaga, watchAlbumSaga, watchPhotoSaga } from './sagas';

import RootReducer from './slices';

function* RootSaga() {

    yield all([fork(watchUserSaga), fork(watchAlbumSaga), fork(watchPhotoSaga)]);

}

const sagaMiddleware = saga();

const store = configureStore({
    reducer: RootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
            thunk: false
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;