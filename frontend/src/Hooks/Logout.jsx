
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
    const navigate = useNavigate();
  
    const logout = async () => {
      try {
        const response = await axios.post("http://localhost:4000/logout", { withCredentials: true });
  
        if (response.status === 200) {
       
          toast.success("Logged out successfully!");
          navigate("/Login"); // Redirect to login page
        } else {
          toast.error("Logout failed. Please try again.");
        }
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("An error occurred while logging out.");
      }
    };
  
    return logout;
  };
  
  export default useLogout;