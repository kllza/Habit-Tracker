import PropTypes from "prop-types";
import Heading from "../../1.Atoms/Heading/Heading";
import SubHeading from "../../1.Atoms/SubHeading/SubHeading";
import CTAButton from "../../1.Atoms/CTAButton/CTAButton";
import { Link } from "react-router-dom";

const HeroSection = ({ authenticated }) => {
  return (
    <section className="bg-gray-100 py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <Heading />
        <SubHeading />
        {authenticated ? ( // muestra AddHabitSection si el usuario está autenticado
          <Link
            to="add-habit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full inline-block"
          >
            Agregar hábito
          </Link>
        ) : (
          <CTAButton />
        )}
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default HeroSection;
