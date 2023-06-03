import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ authenticated, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className={`lg:hidden text-gray-600 hover:text-gray-900 ${
          isOpen ? "transform rotate-90" : ""
        }`}
        onClick={handleToggle}
      >
        <span className="sr-only">Toggle Menu</span>
        <div className="w-6 h-1 bg-gray-600 mb-1"></div>
        <div className="w-6 h-1 bg-gray-600 mb-1"></div>
        <div className="w-6 h-1 bg-gray-600"></div>
      </button>

      <ul
        className={`${
          isOpen ? "" : "hidden"
        } lg:flex flex-grow lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent z-20`}
      >
        <li className="mr-3">
          <Link
            to="/"
            className="text-gray-600 hover:text-purple-700 block lg:inline-block lg:mt-0 font-medium transition-colors duration-300"
          >
            Inicio
          </Link>
        </li>
        <li className="mr-3">
          <Link
            to="features"
            className="text-gray-600 hover:text-purple-700 block lg:inline-block lg:mt-0 font-medium transition-colors duration-300"
          >
            Características
          </Link>
        </li>
        <li className="mr-3">
          <Link
            to="how-it-works"
            className="text-gray-600 hover:text-purple-700 block lg:inline-block lg:mt-0 font-medium transition-colors duration-300"
          >
            Cómo funciona
          </Link>
        </li>
        {authenticated ? (
          <li className="mr-3">
            <Link
              to="habits"
              className="text-gray-600 hover:text-purple-700 block lg:inline-block lg:mt-0 font-medium transition-colors duration-300"
            >
              Hábitos
            </Link>
          </li>
        ) : (
          ""
        )}
        {authenticated && currentPage !== "/" && (
          <li>
            <Link
              to="add-habit"
              className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-full inline-block transition-colors duration-300"
            >
              Agregar hábito
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

Menu.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default Menu;
