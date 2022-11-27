import React from "react";
import { useDispatch } from "react-redux";
import { deleteAccount } from "../../store/account/account";
import "./AccountDelete.css";

export default function AccountDelete({ oldAccount }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteAccount(oldAccount));
    window.location.reload();
    return false; // prevent page refresh on submit
  };
  return (
    <div className="AccountDelete">
      <button className="AccountDeleteButton" onClick={handleSubmit}>
        Delete Account
      </button>
      <i className="fa fa-trash" aria-hidden="true"></i>
      <p>Are you sure you want to delete this account?</p>
      <p>This action cannot be undone.</p>
    </div>
  );
}
