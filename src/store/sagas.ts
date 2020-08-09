import axios, { AxiosResponse } from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

import * as actions from './actions';
import * as sliceActions from './slices';

import Album  from '../model/Album';
import Photo  from '../model/Photo';
import User  from '../model/User';
import { API_HOST } from '../util/util';

function* getUserListApi() {
    yield put(sliceActions.setIsLoading(true));

    try {
        const { data }: AxiosResponse<Array<User>> = yield axios.get(`${API_HOST}/users`);

        yield put(sliceActions.setUsers(data));
    } catch (error) {
        console.log(error);
    }

    yield put(sliceActions.setIsLoading(false));

}

function* getAlbumListApi(action: ReturnType<typeof actions.getAlbumListApi>) {
    yield put(sliceActions.setIsLoading(true));

    const { payload: { id }} = action;

    try {
        const { data }: AxiosResponse<Array<Album>> = yield axios.get(`${API_HOST}/albums?userId=${id}`);

        yield put(sliceActions.setAlbums(data));
    } catch (error) {
        console.log(error);
    }

    yield put(sliceActions.setIsLoading(false));

}

function* getPhotoListApi(action: ReturnType<typeof actions.getPhotoListApi>) {

    yield put(sliceActions.setIsLoading(true));
    
    const { payload: { id }} = action;

    try {
        const { data }: AxiosResponse<Array<Photo>> = yield axios.get(`${API_HOST}/photos?albumId=${id}`);

        yield put(sliceActions.setPhotos(data));
    } catch (error) {
        console.log(error);
    }

    yield put(sliceActions.setIsLoading(false));

}

export function* watchUserSaga() {
    yield takeLatest(actions.getUserListApi.type, getUserListApi);
}

export function* watchAlbumSaga() {
    yield takeLatest(actions.getAlbumListApi.type, getAlbumListApi);
}

export function* watchPhotoSaga() {
    yield takeLatest(actions.getPhotoListApi.type, getPhotoListApi);
}