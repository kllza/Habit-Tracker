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
        className="lg:hidden text-gray-600 hover:text-gray-900"
        onClick={handleToggle}
      >
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      <ul
        className={`${
          isOpen ? "" : "hidden"
        } lg:flex flex-grow lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent z-20`}
      >
        <li className="mr-3">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 block lg:inline-block lg:mt-0 font-medium"
          >
            Inicio
          </Link>
        </li>
        <li className="mr-3">
          <Link
            to="features"
            className="text-gray-600 hover:text-gray-900 block lg:inline-block lg:mt-0 font-medium"
          >
            Características
          </Link>
        </li>
        <li className="mr-3">
          <Link
            to="how-it-works"
            className="text-gray-600 hover:text-gray-900 block lg:inline-block lg:mt-0 font-medium"
          >
            Cómo funciona
          </Link>
        </li>
        {authenticated ? (
          <li className="mr-3">
            <Link
              to="habits"
              className="text-gray-600 hover:text-gray-900 block lg:inline-block lg:mt-0 font-medium"
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full inline-block"
            >
              Agregar hábito
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
