import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Dashboard from "../pages/Dashboard";
import Enroll from "../pages/Enroll";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Users";
import NotFound from "../components/NotFound";
import Milestone from "../pages/Milestone";
import EnrollDetails from "../pages/EnrollDetails";
import User from "../pages/user";
import Moduls from "../pages/Moduls";
import Topics from "../pages/Topics";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/enroll",
        element: <Enroll />,
      },
      {
        path: "/enroll/:id",
        element: <EnrollDetails />,
      },
      {
        path: "/milestone",
        element: <Milestone />,
      },
      {
        path: "/milestone/:milestoneID",
        element: <Moduls />,
      },
      {
        path: "/milestone/:milestoneID/:modulesID",
        element: <Topics />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
