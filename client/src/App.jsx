import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import PostPage from "./pages/posts-page/PostPage";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import PostDetails from "./pages/Post-details/PostDetails";
import Category from "./pages/category/Category";
import ProfilePage from "./pages/profile-page/ProfilePage";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable ";
import CategoriesTable from "./pages/admin/CategoriesTable ";
import CommentsTable from "./pages/admin/CommentsTable ";
import ForgotPassword from "./pages/forms/ForgotPassword ";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/VerifyEmail.jsx";
export default function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
        path="/users/:userId/verify/:token"
        element={!user ? <VerifyEmail /> : <Navigate to="/" />}
      />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />

        <Route path="posts">
          <Route index element={<PostPage />} />
          <Route path=":id" element={<PostDetails />} />
          <Route
            path="create-posts"
            element={user ? <CreatePost /> : <Navigate to="/register" />}
          />
          <Route path="categories/:category" element={<Category />} />
        </Route>

        <Route path="/profile/:id" element={<ProfilePage />} />

        <Route path="/admin-dashboard" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}>
          <Route
            path="users-table"
            element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}
          />
          <Route
            path="posts-table"
            element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}
          />
          <Route
            path="categories-table"
            element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}
          />
          <Route
            path="comments-table"
            element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
