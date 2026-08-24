import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerGoogle } from "../api/auth.api";

// CUSTOM HOOK - LOGIN AND REGISTER WILL USE SAME HOOK FOR GOOGLE AUTH
export const useGoogleAuth = () => {
  const navigate = useNavigate();

  const handleGoogleAuth = async ({ credential }) => {
    try {
      // CALL BACKEND GOOGLE AUTH API AND SAVE RESPONSE IN LOCAL STORAGE
      const res = await registerGoogle({ token: credential });
      localStorage.setItem("lastLoginMethod", "google");

      // OPTIONALLY CHAIN THE RESULT AND CHECK WHERE TOKEN EXIST AND SET TOKEN
      if (res?.token) {
        localStorage.setItem("token", res.token);
      }
      // OPTIONALLY CHAIN AND FIND THE USER DETAILS AND SET USER DETAILS AND SAVE IN LOCAL STORAGE
      if (res?.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      // FIRE TOAST AFTER SUCCESS NAVIGATE USER TO DASHBOARD PAGE
      toast.success(res?.message);

      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message;
      toast.error(errorMessage);
    }
  };

  return { handleGoogleAuth };
};

export default useGoogleAuth;
