import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogout } from "../../features/actions/authActions";
import Modal from "./Modal";
import Button from "./Button";

// REUSABLE LOGIN MODAL - USED IN SIDEBAR AND PROFILE PAGE 
export default function LogoutModal({ isOpen, onClose, onAfterLogout }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // HANDLES CONFIRMATION AND NAVIGATES TO HOME PAGE 
  const handleConfirmLogout = () => {
    onClose();
    if (onAfterLogout) {
      onAfterLogout();
    }
    dispatch(userLogout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ModalTitle="Confirm Logout"
      actions={
        <Button
          type="button"
          variant="primary"
          onClick={handleConfirmLogout}
          className="px-4 py-2 text-sm"
        >
          Logout
        </Button>
      }
    >
      <p className="text-body text-sm">
        Are you sure you want to log out of your account?
      </p>
    </Modal>
  );
}
