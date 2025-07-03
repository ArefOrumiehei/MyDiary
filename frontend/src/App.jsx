import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

// Protect Route
import AuthRoute from "./routers/AuthRoute";

// Helpers
import { format } from "./helpers/dateHelpers";

export default function App() {
  const today = format(new Date());

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/:date"
        element={
          <AuthRoute>
            <Home />
          </AuthRoute>
        }
      />

      <Route path="/" element={<Navigate to={`/${today}`} replace />} />
      <Route path="*" element={<Navigate to={`/${today}`} replace />} />
    </Routes>
  );
}
