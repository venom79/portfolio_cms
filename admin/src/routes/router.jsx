import { createBrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Milestones from "@/pages/Milestones";
import Profile from "@/pages/Profile";
import Projects from "@/pages/Projects";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/milestones",
        element: <Milestones />,
      },
    ],
  },
]);
