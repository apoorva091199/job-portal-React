import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile,
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handlePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
      if (isUpdated) {
        toast.success("Password Updated Successfully");
        dispatch(getUser());
        dispatch(clearAllUpdateProfileErrors());
      }
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className="account_components update_password_component">
      <h3>Update Password</h3>
      <div>
        <label>Current Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
        {showPassword ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FaRegEye
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <div>
        <label>New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
        {showPassword ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FaRegEye
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        {showPassword ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FaRegEye
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      <div className="save_changes_btn_wrapper">
        <button className="btn" onClick={handlePassword} disabled={loading}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
// , 