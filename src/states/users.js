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
import { apiKey } from "../App";
import { auth, db } from "../config/firebase";
import axios from "axios";

const initialState = {
  userData: {},
  userFavorites: [],
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
    const { data } = await axios.get(
      //MOVIE DATA
      `https://api.themoviedb.org/3/movie/${movieId}${apiKey}&language=en-US`
    );
    try {
      await addDoc(collection(db, "favorites"), { ...data, userId });
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
        where("id", "==", movieId),
        where("userId", "==", String(userId))
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
  async (userId) => {
    try {
      const movies = [];
      const favoritesQuery = query(
        collection(db, "favorites"),
        where("userId", "==", userId)
      );
      const favorites = await getDocs(favoritesQuery);
      favorites.forEach((movie) => {
        movies.push(movie.data());
      });
      return movies;
    } catch (error) {
      throw error;
    }
  }
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
      alert("The movie was successfully added to favorites!");
      //state.favoritesIds = [...state.favoritesIds, action.payload];
    });
    builder.addCase(addToFavorites.rejected, () => {
      alert("There has been an error when adding the movie to favorites");
      throw new Error(
        "There has been an error when adding the movie to favorites"
      );
    });

    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.userFavorites = state.userFavorites.filter(
        (movie) => movie.id !== action.payload
      );
      alert("The movie was successfully removed!");
    });
    builder.addCase(removeFromFavorites.rejected, () => {
      alert(
        "There has been an error when removing the movie from your favorites"
      );
      throw new Error(
        "There has been an error when removing the movie from your favorites"
      );
    });

    builder.addCase(getAllFavorites.fulfilled, (state, action) => {
      state.userFavorites = action.payload;
    });
    builder.addCase(getAllFavorites.rejected, () => {
      throw new Error("We couldn't retrieve your favorites.");
    });
  },
});

export default userSlice.reducer;
