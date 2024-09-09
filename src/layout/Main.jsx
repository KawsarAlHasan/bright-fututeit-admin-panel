import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaBook, FaUserPlus, FaUsers } from "react-icons/fa";
import { MdViewModule, MdDashboard } from "react-icons/md";

function Main() {
  return (
    <div>
      <Navbar />
      <div className="drawer md:drawer-open">
        {/* Ensure the drawer toggle checkbox has the correct ID */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side shadow-2xl">
          {/* Ensure the label references the correct ID for the drawer overlay */}
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 bg-base-200 md:bg-base-100 lg:w-80 h-full">
            {/* Sidebar content here */}

            <li>
              <Link className="font-semibold text-lg py-3 mt-1" to="/">
                <MdDashboard className="mr-2" />
                Dashboard
              </Link>
            </li>

            <li>
              <Link className="font-semibold text-lg py-3 mt-1" to="/courses">
                <FaBook className="mr-2" />
                Courses
              </Link>
            </li>

            <li>
              <Link className="font-semibold text-lg py-3 mt-1" to="/enroll">
                <FaUserPlus className="mr-2" />
                Enroll
              </Link>
            </li>

            <li>
              <Link className="font-semibold text-lg py-3 mt-1" to="/milestone">
                <MdViewModule className="mr-2" />
                Milestone
              </Link>
            </li>

            <li>
              <Link className="font-semibold text-lg py-3 mt-1" to="/users">
                <FaUsers className="mr-2" />
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;
