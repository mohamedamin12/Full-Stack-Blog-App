import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Register = () => {

  const {registerMessage} = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Please enter a username");
    if (email.trim() === "") return toast.error("Please enter a valid email");
    if (password.trim() === "") return toast.error("Please enter a password");
    dispatch(registerUser({ username, email, password }));
  };

  const navigate = useNavigate();

  if(registerMessage){
    swal({
      title: "Registration Successful!",
      text: registerMessage,
      icon: "success",
      button: "Okay",
    }).then(isOk => {
      if (isOk) {
        navigate("/login");
      }
    })
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Enter your username"
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                placeholder="Enter your email"
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
              Register
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
