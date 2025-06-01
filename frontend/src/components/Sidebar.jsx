import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClasses = (path) =>
    `flex items-center w-full gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentPath === path
        ? "bg-amber-500 text-black-700"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (
    <aside className="w-64  bg-gray-100 border-r border-gray-300 hidden lg:flex flex-col h-screen sticky top-0">
     

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <Link to="/users" className={linkClasses("/users")}>
          <HomeIcon className="w-5 h-5 text-gray-500" />
          <span>Users</span>
        </Link>

        <Link to="/friends" className={linkClasses("/friends")}>
          <UsersIcon className="w-5 h-5 text-gray-500" />
          <span>Friends</span>
        </Link>

        <Link to="/notifications" className={linkClasses("/notifications")}>
          <BellIcon className="w-5 h-5 text-gray-500" />
          <span>Notifications</span>
        </Link>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={currentUser?.avatar || "/noavatar.jpg"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{currentUser?.username}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
