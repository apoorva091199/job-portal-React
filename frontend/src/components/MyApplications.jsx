import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import { Spinner } from "./Spinner";

const MyApplications = () => {
  const {
    user,
    isAuthenticated,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const { loading, error, message, myApplications } = useSelector(
    (state) => state.applications,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchJobSeekerApplications());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }

    // don't perform route redirects here; let route guards handle access
  }, [dispatch, error, message, user, isAuthenticated, userLoading]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  const apps = myApplications || [];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : apps.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "2rem" }}>
          You have not applied for any jobs
        </h1>
      ) : (
        <>
          <div className="account_components">
            <h3>My Application for Jobs</h3>
            <div className="applications_container">
              {apps.map((element) => (
                <div className="card" key={element._id}>
                  <p className="sub-sec">
                    <span>Job Title</span>
                    {element.jobInfo?.jobTitle}
                  </p>
                  <p className="sub-sec">
                    <span>Name</span>
                    {element.jobSeekerInfo?.name?.name}
                  </p>
                  <p className="sub-sec">
                    <span>Email</span>
                    {element.jobSeekerInfo?.email}
                  </p>
                  <p className="sub-sec">
                    <span>Phone</span>
                    {element.jobSeekerInfo?.phone}
                  </p>
                  <p className="sub-sec">
                    <span>Address</span>
                    {element.jobSeekerInfo?.address}
                  </p>
                  <p className="sub-sec">
                    <span>Coverletter</span>
                    <textarea
                      value={element.jobSeekerInfo?.coverLetter || ""}
                      rows={5}
                      disabled
                    ></textarea>
                  </p>
                  <div className="btn-wrapper">
                    <button
                      className="outline_btn"
                      onClick={() => handleDeleteApplication(element._id)}
                    >
                      Delete Application
                    </button>
                    {element.jobSeekerInfo && element.jobSeekerInfo.resume && (
                      <a
                        href={element.jobSeekerInfo.resume.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn"
                      >
                        View Resume
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyApplications;
