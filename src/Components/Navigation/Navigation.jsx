import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import { useLocation } from "react-router-dom";

const Navigation = ({ authenticated }) => {
  const location = useLocation();
  return (
    <nav className="flex items-center">
      <Logo />
      <Menu authenticated={authenticated} currentPage={location.pathname} />
    </nav>
  );
};

export default Navigation;
