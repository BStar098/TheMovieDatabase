import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  userFavorites: [],
};

const addToFavorites = createAsyncThunk(
  "ADD_TO_FAVORITES",
  (userId, movieId) => {}
);

const removeFromFavorites = createAsyncThunk(
  "REMOVE_FROM_FAVORITES",
  (userId, movieId) => {}
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    [addToFavorites.fulfilled]: () => {},
    [addToFavorites.rejected]: () => {},
    [removeFromFavorites.fulfilled]: () => {},
    [removeFromFavorites.rejected]: () => {},
  },
});
