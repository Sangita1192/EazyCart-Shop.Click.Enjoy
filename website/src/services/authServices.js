import { logoutUserThunk } from "../redux/slices/authSlice";
import { showError, showSuccess } from "./toastService";

// Single, reusable logout handler
export const handleLogout = async ({ dispatch, navigate }) => {
  try {
    const res = await dispatch(logoutUserThunk());
    if (res?.meta?.requestStatus === "fulfilled") {
      showSuccess("Logged out successfully");
      localStorage.removeItem("EazyCartUser");
      navigate("/");
    } else {
      showError("Logout failed");
    }
  } catch (error) {
    showError(error.message ||  "Something went wrong during logout" );
  }
};
