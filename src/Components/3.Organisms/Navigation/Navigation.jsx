import Logo from "../../1.Atoms/Logo/Logo";
import Menu from "../../2.Molecules/Menu/Menu";
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
