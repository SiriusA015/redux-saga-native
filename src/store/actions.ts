import { createAction } from "@reduxjs/toolkit";

export type GetApiPayload = {
    id: number
}

export const getUserListApi = createAction('getUserListApi');
export const getAlbumListApi = createAction<GetApiPayload>('getAlbumListApi');
export const getPhotoListApi = createAction<GetApiPayload>('getPhotoListApi');
export const clearStore = createAction('clearStore')

