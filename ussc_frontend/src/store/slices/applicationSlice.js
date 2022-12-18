import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APPLICATIONS_API from '../../api/applicationsAPI';

const initialState = {
  applications: [],
};

const applicationState = {
  id: null,
  userId: null,
  directionId: null,
  isAllowed: null,
};

export const getApplicationsByUserId = createAsyncThunk(
  'applications/getApplicationsByUserId',
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
      let response = await fetch(
        `${APPLICATIONS_API.GET_BY_USER_ID_URL}?userId=${userId}`,
        {
          method: 'get',
          headers: {
            Authorization: accessToken,
          },
        }
      );

      if (!response.ok) throw new Error(`${response.status}`);

      response = await response.json();

      // console.log(response);

      dispatch(setApplications(response));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendApplication = createAsyncThunk(
  'applications/sendApplication',
  async ({ roleId, userId }, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

      const application = {
        directionId: roleId,
        userId: userId,
        allow: null,
      };

      let response = await fetch(APPLICATIONS_API.SEND_APPLICATION_URL, {
        method: 'post',
        body: JSON.stringify(application),
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
      });

      response = await response.json();

      dispatch(getApplicationsByUserId(userId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationSlice = createSlice({
  name: 'applications',
  initialState: initialState,
  reducers: {
    setApplications(state, action) {
      for (let app of action.payload) {
        if (
          state.applications.filter((innerApp) => {
            return innerApp.id === app.id;
          }).length
        )
          continue;

        state.applications.push({
          id: app.id,
          userId: app.userId,
          directionId: app.directionId,
          isAllowed: app.allow,
        });
      }
    },
  },
  extraReducers: {
    [getApplicationsByUserId.pending]: () => {},
    [getApplicationsByUserId.fulfilled]: () => {},
    [getApplicationsByUserId.rejected]: () => {},
    [sendApplication.pending]: () => {},
    [sendApplication.fulfilled]: () => {},
    [sendApplication.rejected]: () => {},
  },
});

export const { setApplications } = applicationSlice.actions;

export default applicationSlice.reducer;
