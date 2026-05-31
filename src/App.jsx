import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Splash from "./pages/Splash";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Storage from "./pages/Storage";
import Record from "./pages/Record";
import Verify from "./pages/Verify";
import Statistics from "./pages/Statistics";
import { Layout } from "./components/Layout";
import { TopNavOnlyLayout } from "./components/TopNavOnlyLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<Admin />} />

        {/* Protected routes (with Layout) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/record" element={<Record />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/statistics" element={<Statistics />} />
          </Route>

          {/* Routes with TopNav only */}
          <Route element={<TopNavOnlyLayout />}>
            <Route path="/notifications" element={<Notification />} />
          </Route>

          {/* Standalone Pages */}
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
