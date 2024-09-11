import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Please enter a valid email");
    if (password.trim() === "") return toast.error("Please enter a password");
    console.log({ email, password });
    dispatch(loginUser({  email,  password}));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="Enter your Email"
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                placeholder="Enter your password"
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
            <Link
              to="/forgot-password"
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
