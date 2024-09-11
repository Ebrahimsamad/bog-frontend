import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowSpinner(true);

    setTimeout(() => {
      logout();
      setShowSpinner(false);
      navigate("/login");
    }, 1000);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-3xl font-bold text-yellow-500">
          Ebrahim Samad
        </Link>

        <button onClick={toggleMenu} className="text-gray-100 md:hidden">
          {menuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>

        <ul className={`md:flex space-x-8 hidden`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 transition duration-300 text-lg font-medium"
                  : "text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
              }
            >
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 transition duration-300 text-lg font-medium"
                  : "text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
              }
            >
              Profile
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 transition duration-300 text-lg font-medium"
                  : "text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        <div className="hidden md:flex space-x-6 items-center">
          <a
            href="https://www.linkedin.com/in/ebrahim7asn"
            className="text-gray-100 hover:text-yellow-500 transition duration-300"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://github.com/Ebrahimsamad"
            className="text-gray-100 hover:text-yellow-500 transition duration-300"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.facebook.com/ebrahim7asn"
            className="text-gray-100 hover:text-yellow-500 transition duration-300"
          >
            <FaFacebook className="text-2xl" />
          </a>

          {isAuthenticated ? (
            showSpinner ? (
              <FiLoader className="ml-6 text-yellow-500 animate-spin text-2xl" />
            ) : (
              <div className="ml-6 flex items-center space-x-2">
                <span className="text-gray-100 font-medium">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-2xl" />
                </button>
              </div>
            )
          ) : (
            <NavLink
              to="/login"
              className="ml-6 text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      <div
        className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-gray-800 p-4`}
      >
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 transition duration-300 text-lg font-medium"
                  : "text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 transition duration-300 text-lg font-medium"
                  : "text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>
          </li>
        </ul>

        <div className="mt-6 flex space-x-6 items-center">
          <a
            href="https://www.linkedin.com/in/ebrahim7asn"
            className="text-gray-100 hover:text-yellow-500 transition duration-300"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://github.com/Ebrahimsamad"
            className="text-gray-100 hover:text-yellow-500 transition duration-300"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.facebook.com/ebrahim7asn"
            className="text-gray-100 hover:text-yellow-500 transition duration-300"
          >
            <FaFacebook className="text-2xl" />
          </a>
        </div>

        {isAuthenticated ? (
          showSpinner ? (
            <FiLoader className="ml-6 text-yellow-500 animate-spin text-2xl" />
          ) : (
            <div className="mt-6 flex items-center space-x-2">
              <span className="text-gray-100 font-medium">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
                title="Logout"
              >
                <FaSignOutAlt className="text-2xl" />
              </button>
            </div>
          )
        ) : (
          <NavLink
            to="/login"
            className="mt-6 text-gray-100 hover:text-yellow-500 transition duration-300 text-lg font-medium"
            onClick={toggleMenu}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
