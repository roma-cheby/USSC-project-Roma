import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './slices/popupSlice';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import directionsReducer from './slices/directionSlice';
import allApplicationsReducer from './slices/allApplicationsSlice';
import allUsersReducer from './slices/allUsersSlice';
import applicationReducer from './slices/applicationSlice';

export default configureStore({
  reducer: {
    popups: popupReducer,
    user: userReducer,
    profile: profileReducer,
    directions: directionsReducer,
    applications: applicationReducer,
    allApplications: allApplicationsReducer,
    allUsers: allUsersReducer,
  },
});
