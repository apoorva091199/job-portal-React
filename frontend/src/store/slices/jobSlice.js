import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    requestForAllJobs(state) {
      state.loading = true;
      state.error = null;
    },
    requestForSingleJob(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.error = null;
      state.singleJob = action.payload;
    },
    failureForSingleJob(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    requestForPostJob(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    failureForPostJob(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failureForAllJobs(state, action) {
      state.loading = false;

      state.error = action.payload;
    },
    requestForMyJobs(state) {
      state.loading = true;
      state.myJobs = [];
      state.error = null;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;
      state.error = null;
    },
    failureForMyJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForDeleteJob(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteJob(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    },
    resetJobSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.jobs = [];
      state.myJobs = [];
      state.singleJob = {};
    },
  },
});
export const fetchJobs =
  (city, niche, searchKeyword = "") =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());
      let link = "http://localhost:4000/api/v1/job/getall";
      const queryParams = [];

      if (searchKeyword) {
        queryParams.push(`searchKeyword=${encodeURIComponent(searchKeyword)}`);
      }
      if (city && city !== "All") {
        queryParams.push(`city=${encodeURIComponent(city)}`);
      }
      if (niche && niche !== "All") {
        queryParams.push(`niche=${encodeURIComponent(niche)}`);
      }

      if (queryParams.length) {
        link += `?${queryParams.join("&")}`;
      }
      const response = await axios.get(link, { withCredentials: true });
      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
      dispatch(jobSlice.actions.clearAllErrors());
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      dispatch(jobSlice.actions.failureForAllJobs(message));
    }
  };

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/get/${jobId}`,
      { withCredentials: true },
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(jobSlice.actions.failureForSingleJob(message));
  }
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/job/post`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(jobSlice.actions.failureForPostJob(message));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/getmyjobs`,
      { withCredentials: true },
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(jobSlice.actions.failureForMyJobs(message));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/job/delete/${id}`,
      {
        withCredentials: true,
      },
    );
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErrors());
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(jobSlice.actions.failureForDeleteJob(message));
  }
};

export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
