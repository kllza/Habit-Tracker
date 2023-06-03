import PropTypes from "prop-types";

const HabitInfo = ({ habit, onDelete }) => {
  const handleClick = () => {
    onDelete(habit.id);
  };

  return (
    <div className="w-1/2 bg-gray-20 rounded p-4 ml-4">
      <h3 className="text-xl font-bold mb-2">{habit.name}</h3>
      <p className="text-gray-500 mb-2">{habit.description}</p>
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

HabitInfo.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HabitInfo;
