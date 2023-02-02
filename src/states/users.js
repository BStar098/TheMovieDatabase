import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

const initialState = {
  userData: {},
  userFavoritesIds: [],
  userFavoritesMovies: [],
};
export const signUp = createAsyncThunk("SIGN_UP", async (userData) => {
  const { email, password } = userData;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return userData;
  } catch (error) {
    throw error;
  }
});

export const logIn = createAsyncThunk("LOG_IN", async (userData) => {
  const { email, password } = userData;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
});

export const addToFavorites = createAsyncThunk(
  "ADD_TO_FAVORITES",
  async (movieIdAndUserId) => {
    const { userId, movieId } = movieIdAndUserId;
    try {
      await addDoc(collection(db, "favorites"), {
        userId: userId,
        movieId: movieId,
      });
      return movieId;
    } catch (error) {
      throw error;
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "REMOVE_FROM_FAVORITES",
  async (movieIdAndUserId) => {
    const { movieId, userId } = movieIdAndUserId;
    try {
      const favoriteQuery = query(
        collection(db, "favorites"),
        where("movieId", "==", String(movieId)),
        where("userId", "==", userId)
      );
      const favoritesToDelete = await getDocs(favoriteQuery);
      favoritesToDelete.forEach(
        async (favorite) => await deleteDoc(doc(db, "favorites", favorite.id))
      );
      return movieId;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllFavorites = createAsyncThunk(
  "GET_ALL_FAVORITES",
  async (userId) => {}
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.userData = action.payload;
      alert("Signed Up succesfully!");
    });
    builder.addCase(signUp.rejected, () => {
      alert("There has been an error with your registration.");
      throw new Error("There has been an error with your registration.");
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.userData = action.payload;
      alert("Logged In succesfully!");
    });
    builder.addCase(logIn.rejected, () => {
      alert("There has been an error with your credentials.");
      throw new Error("There has been an error with your credentials.");
    });

    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.userFavoritesIds = [...state.userFavoritesIds, action.payload];
    });
    builder.addCase(addToFavorites.rejected, () => {
      alert("There has been an error when adding the movie to favorites");
      throw new Error(
        "There has been an error when adding the movie to favorites"
      );
    });

    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      const { movieId } = action.payload;
      state.userFavoritesMovies = state.userFavoritesMovies.filter(
        (movie) => movie.id !== movieId
      );
    });
    builder.addCase(removeFromFavorites.rejected, () => {
      alert(
        "There has been an error when removing the movie from your favorites"
      );
      throw new Error(
        "There has been an error when removing the movie from your favorites"
      );
    });
  },
});

export default userSlice.reducer;
