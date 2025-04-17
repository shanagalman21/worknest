import React, { useState } from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if(!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    // Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, 
        password,
      });
      
      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-3xl mb-[10px] font-regular text-black">Welcome Back!</h3>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="Enter here..."
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter here..."
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
          <button type="submit" className="btn-primary">SIGN IN</button>
          
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
            Register
            </Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login;