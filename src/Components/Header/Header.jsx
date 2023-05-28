import Navigation from "../Navigation/Navigation";
import UserActions from "../UserActions/UserActions";
import Profile from "../Profile/Profile";

const Header = ({ authenticated, user }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
      <Navigation authenticated={authenticated}/>
      {/* <UserActions /> */}
      {authenticated && <Profile user={user} />}
      {!authenticated && (
        <>
        <UserActions/>
        </>
      )}
    </header>
  );
};

export default Header;
