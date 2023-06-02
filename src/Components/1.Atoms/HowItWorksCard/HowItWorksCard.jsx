const HowItWorksCard = ({ icon, heading, description }) => {
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

export default HowItWorksCard;
