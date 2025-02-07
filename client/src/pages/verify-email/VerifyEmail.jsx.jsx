/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector(state => state.auth);

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {isEmailVerified ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <i className="bi bi-patch-check text-green-500 text-4xl mb-4"></i>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Your email address has been successfully verified
          </h1>
          <Link 
            to="/login" 
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-medium"
          >
            Go To Login Page
          </Link>
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">
            Verification Link Not Found
          </h1>
          <p className="text-gray-600">The link you used is invalid or expired. Please try again.</p>
        </div>
      )}
    </section>
  );
};

export default VerifyEmail;

