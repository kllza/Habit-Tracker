import PropTypes from "prop-types";
import Navigation from "../Navigation/Navigation";
import UserActions from "../../Template/UserActions/UserActions";
import Profile from "../Profile/Profile";

const Header = ({ authenticated, user }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
      <Navigation authenticated={authenticated} />
      {authenticated && <Profile user={user} />}
      {!authenticated && (
        <>
          <UserActions />
        </>
      )}
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default Header;
