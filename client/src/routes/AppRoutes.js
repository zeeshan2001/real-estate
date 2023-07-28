import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import IntakeForm from "../components/IntakeForm/IntakeForm";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Mastersheet from "../components/Mastersheet/Mastersheet";
import NotFound from "../components/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={<Navigate to="/dashboard" replace />} // Redirect from "/" to "/login"
        />
        <Route path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/mastersheet" element={<PrivateRoute />}>
          <Route exact path="/mastersheet" element={<Mastersheet />} />
        </Route>
        <Route exact path="/intake-form" element={<PrivateRoute />}>
          <Route exact path="/intake-form" element={<IntakeForm />} />
        </Route>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
