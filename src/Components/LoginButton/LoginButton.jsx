import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link
      to="/login"
      className="text-gray-600 hover:text-gray-900 block lg:inline-block lg:mt-0 font-medium mr-3"
    >
      Iniciar sesión
    </Link>
  );
};

export default LoginButton;
