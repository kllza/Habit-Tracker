import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="#" className="mr-4">
      <img src="nombredelogo.svg" alt="Logo de la aplicación" className="h-8" />
    </Link>
  );
}
export default Logo;
