import { Link } from "react-router-dom";

const RegisterButton = () => {
  return (
    <Link
      to="/register"
      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full inline-block"
    >
      Registrarse
    </Link>
  );
};

export default RegisterButton;
