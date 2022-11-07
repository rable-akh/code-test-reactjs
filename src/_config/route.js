import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import ProtectedRoute from "./PrivateRoute";

import Dashboard from "../pages/Dashboard";
import UserList from "../pages/user/LIst";
import LogList from "../pages/logs/LIst";
import Login from "../pages/Login";

export default function RouterConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
          </Route>
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          >
          </Route>
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <LogList />
              </ProtectedRoute>
            }
          >
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
