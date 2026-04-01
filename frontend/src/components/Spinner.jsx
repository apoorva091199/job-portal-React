import React from "react";
import { ClipLoader } from "react-spinners";

export const Spinner = () => {
  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "525px",
        }}
      >
        <ClipLoader color="#36d7b7" size={150} aria-label="Loading Spinner" />
      </section>
    </>
  );
};
