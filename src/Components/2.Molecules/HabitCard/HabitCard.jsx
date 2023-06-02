import PropTypes from "prop-types";
import HabitInfo from "../../1.Atoms/HabitInfo/HabitInfo";
import HabitProgress from "../HabitProgress/HabitProgress";

const HabitCard = ({ habit, onDelete }) => {
  return (
    <li className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        <HabitInfo onDelete={onDelete} habit={habit} />
        <HabitProgress habit={habit} habitId={habit.id} />
      </div>
    </li>
  );
};

HabitCard.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default HabitCard;
