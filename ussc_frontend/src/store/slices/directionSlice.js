import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import DIRECTIONS_API from '../../api/directionsAPI';

const initialState = {
  directions: [],
};

const directionState = {
  id: null,
  description: null,
  roles: null,
  info: null,
  title: null,
  start: null,
  end: null,
  isShown: false,
};

export const getDirections = createAsyncThunk(
  'directions/getDirections',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      let response = await fetch(DIRECTIONS_API.GET_DIRECTIONS_URL);

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      response = await response.json();

      dispatch(setDirections(response));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const directionSlice = createSlice({
  name: 'directions',
  initialState: initialState,
  reducers: {
    setDirections(state, action) {
      for (let direction of action.payload) {
        if (
          state.directions.filter((dir) => {
            return dir.id === direction.id;
          }).length
        )
          continue;
        state.directions.push({
          id: direction.id,
          title: direction.name,
          description: direction.description,
          roles: direction.directions,
          info: direction.info,
          start: direction.startPractices,
          end: direction.endPractcies,
          isShown: false,
          isApplicationFormShown: false,
        });
      }
    },
    showDirection(state, action) {
      const index = state.directions.findIndex((direction) => {
        return direction.id === action.payload.id;
      });
      if (index < 0) return;
      state.directions[index].isShown = true;
    },
    hideDirection(state, action) {
      const index = state.directions.findIndex((direction) => {
        return direction.id === action.payload.id;
      });
      if (index < 0) return;
      state.directions[index].isShown = false;
    },
    toggleDirection(state, action) {
      const index = state.directions.findIndex((direction) => {
        return direction.id === action.payload.id;
      });
      if (index < 0) return;
      state.directions[index].isShown = !state.directions[index].isShown;
    },
    hideAllDirections(state) {
      state.directions.forEach((direction) => {
        direction.isShown = false;
      });
    },
    toggleApplicationForm(state, action) {
      const index = state.directions.findIndex((direction) => {
        return direction.id === action.payload.id;
      });
      if (index < 0) return;
      state.directions[index].isApplicationFormShown =
        !state.directions[index].isApplicationFormShown;
    },
    hideAllApplicationForms(state) {
      state.directions.forEach((direction) => {
        direction.isApplicationFormShown = false;
      });
    },
  },
  extraReducers: {
    [getDirections.pending]: () => {},
    [getDirections.fulfilled]: () => {},
    [getDirections.rejected]: () => {},
  },
});

export const {
  setDirections,
  showDirection,
  hideDirection,
  hideAllDirections,
  toggleDirection,
  toggleApplicationForm,
  hideAllApplicationForms,
} = directionSlice.actions;
export default directionSlice.reducer;
