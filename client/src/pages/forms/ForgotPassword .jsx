import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Please enter a valid email");

    dispatch(forgotPassword(email));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-4">
          Enter your email address below and send you a link to reset your
          password.
        </p>

        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
