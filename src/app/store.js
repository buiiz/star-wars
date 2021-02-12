import {
  createSlice,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { fetchFilms } from '../api/swAPI';

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    films: [],
    loading: false,
    error: null,
  },
  reducers: {
    getFilmsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFilmsSuccess: (state, action) => {
      state.films = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFilmsFailure: (state, action) => {
      state.loading = true;
      state.error = action.payload.stack;
    },
  },
});

export const {
  getFilmsStart,
  getFilmsSuccess,
  getFilmsFailure,
} = filmsSlice.actions;

const store = configureStore({
  reducer: filmsSlice.reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;

export const getFilms = () => async (dispatch) => {
  try {
    dispatch(getFilmsStart());
    const films = await fetchFilms();
    dispatch(getFilmsSuccess(films));
  } catch (err) {
    dispatch(getFilmsFailure(err));
  }
};
