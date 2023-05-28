import { Link } from "react-router-dom";

const CTAButton = () => {
  return (
    <Link
      to="/register"
      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full inline-block"
    >
      Comenzar
    </Link>
  );
};

export default CTAButton;
