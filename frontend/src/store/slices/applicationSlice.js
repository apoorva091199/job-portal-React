import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
    myApplications: [],
  },
  reducers: {
    requestForAllApplications(state) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForAllApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForMyApplications(state) {
      state.loading = true;
      state.myApplications = [];
      state.error = null;
    },
    successForMyApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.myApplications = action.payload;
    },
    failureForMyApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplications(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForPostApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteApplication(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    clearAllErrors(state) {
      state.error = null;
    },
    resetApplicationSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.applications = [];
      state.myApplications = [];
    },
  },
});

export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/application/employer/getall`,
      {
        withCredentials: true,
      },
    );
    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.applications,
      ),
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(applicationSlice.actions.failureForAllApplications(message));
  }
};

export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/application/jobseeker/getall`,
      {
        withCredentials: true,
      },
    );
    dispatch(
      applicationSlice.actions.successForMyApplications(
        response.data.applications,
      ),
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(applicationSlice.actions.failureForMyApplications(message));
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplications());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/application/post/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    dispatch(
      applicationSlice.actions.successForPostApplications(
        response.data.message,
      ),
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(applicationSlice.actions.failureForPostApplications(message));
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/application/delete/${id}`,
      {
        withCredentials: true,
      },
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message,
      ),
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(applicationSlice.actions.failureForDeleteApplication(message));
  }
};

export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
