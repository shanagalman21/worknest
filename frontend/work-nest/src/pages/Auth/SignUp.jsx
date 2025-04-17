import {React, useContext, useState} from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("")

  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Handle sign up form submission
    const handleSignUp = async (e) => {
      e.preventDefault();
      
      let profileImageUrl = "";

      if(!fullName) {
        setError("Please enter full name.");
        return;
      }
      if(!password) {
        setError("Please enter the password.");
        return;
      }
  
      setError("");
  
      // Signup API call
      try {
        // Upload image
        if (profilePic) {
          const imgUploadRes = await uploadImage(profilePic);
          profileImageUrl = imgUploadRes.imageUrl || ""; 
        }
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          name: fullName,
          email,
          password,
          profileImageUrl,
          adminInviteToken
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
        <h3 className="text-3xl mb-[10px] font-regular text-black">Create an account</h3>
      
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Enter here..."
            type="text"
          />
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
          <Input
            value={adminInviteToken}
            onChange={({ target }) => setAdminInviteToken(target.value)}
            label="Admin Invite Token"
            placeholder="7-digit code"
            type="text"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
          <button type="submit" className="btn-primary">REGISTER</button>
          
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
            Sign in
            </Link>
          </p>
        </form>
      
      </div>


    </AuthLayout>
  )
}

export default SignUp