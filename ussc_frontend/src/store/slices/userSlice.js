import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import USER_API from '../../api/userAPI';

export const signInUser = createAsyncThunk(
  'user/signIn',
  async function (user, { rejectWithValue, dispatch }) {
    try {
      let response = await fetch(USER_API.SIGN_IN_USER_URL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(
          `${response.status}${
            response.statusText ? ' ' + response.statusText : ''
          }`
        );
      }

      response = await response.json();

      dispatch(setUser(response));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpUser = createAsyncThunk(
  'user/signUp',
  async function (user, { rejectWithValue, dispatch }) {
    try {
      let response = await fetch(USER_API.SIGN_UP_USER_URL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(
          `${response.status}${
            response.statusText ? ' ' + response.statusText : ''
          }`
        );
      }

      response = await response.json();

      dispatch(signInUser(user));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  email: null,
  accessToken: null,
  id: null,
  status: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('userId', action.payload.id);
      localStorage.setItem('email', action.payload.email);
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
    },
  },
  extraReducers: {
    [signInUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [signInUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
    },
    [signInUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [signUpUser.pending]: (state, action) => {},
    [signUpUser.fulfilled]: (state, action) => {},
    [signUpUser.rejected]: (state, action) => {},
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
