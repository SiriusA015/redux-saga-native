import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import Album  from '../model/Album';
import Photo  from '../model/Photo';
import User  from '../model/User';
import { clearStore } from './actions'

const users = createSlice({
    name: 'users',
    initialState: [] as Array<User>,
    reducers: {
        setUsers: (state, { payload }: PayloadAction<Array<User>>) => payload,
        removeUser: (state, { payload }: PayloadAction<number>) => 
            state.filter(item => item.id !== payload),

    },
    extraReducers: {
        [clearStore.type]: () => [],
    }
});

const albums = createSlice({
    name: 'albums',
    initialState: [] as Array<Album>,
    reducers: {
        setAlbums: (state, { payload }: PayloadAction<Array<Album>>) => payload,
        removeAlbum: (state, { payload }: PayloadAction<number>) => 
            state.filter(item => item.id !== payload),

    },
    extraReducers: {
        [clearStore.type]: () => [],
    }
});

const photos = createSlice({
    name: 'photos',
    initialState: [] as Array<Photo>,
    reducers: {
        setPhotos: (state, { payload }: PayloadAction<Array<Photo>>) => payload,
        removePhoto: (state, { payload }: PayloadAction<number>) => 
            state.filter(item => item.id !== payload),

    },
    extraReducers: {
        [clearStore.type]: () => [],
    }
});

const isLoading = createSlice({
    name: 'isLoading',
    initialState: false,
    reducers: {
      setIsLoading: (state, { payload }: PayloadAction<boolean>) => payload,
    },
    extraReducers: {
      [clearStore.type]: () => false,
    },
  })

export const { setUsers, removeUser } = users.actions;
export const { setAlbums, removeAlbum } = albums.actions;
export const { setPhotos, removePhoto } = photos.actions;
export const { setIsLoading } = isLoading.actions


export default combineReducers({
    users: users.reducer,
    albums: albums.reducer,
    photos: photos.reducer,
  isLoading: isLoading.reducer,

})