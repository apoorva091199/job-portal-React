import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: {
    loading: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    updatePasswordRequest(state,) {
      state.loading = true;
    },
    updatePasswordSuccess(state) {
      state.error = null;
      state.loading = false;
      state.isUpdated = true;
    },
    updatePasswordFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUpdated = false;
    },
    profileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.loading = false;
    },
  },
});

export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put( "http://localhost:4000/api/v1/user/update/profile", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(
      updateProfileSlice.actions.updateProfileSuccess(response.data.message) ||
        "Profile Updated Successfully",
    );
  } catch (error) {
    console.log(error);
    dispatch(
      updateProfileSlice.actions.updateProfileFailure(
        error.response.data.message,
      ) || "Failed to update profile",
    );
  }
};

 export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.put( "http://localhost:4000/api/v1/user/update/password", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(
      updateProfileSlice.actions.updatePasswordSuccess(response.data.message) ||
        "Password Updated Successfully",
    );
  } catch (error) {
    console.log(error);
    dispatch(
      updateProfileSlice.actions.updatePasswordFailed(
        error.response.data.message,
      ) || "Failed to update password",
    );
  }
};

export const clearAllUpdateProfileErrors = () => async (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
}

export default updateProfileSlice.reducer