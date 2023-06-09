import PropTypes from "prop-types";

const FeatureCard = ({ heading, icon, description }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <div className="mb-4">
        <img src={icon} alt={heading} className="h-12" />
      </div>
      <h3 className="text-xl font-bold mb-2">{heading}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  heading: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
