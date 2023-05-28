import HabitInfo from "../HabitInfo/HabitInfo";
import HabitProgress from "../HabitProgress/HabitProgress";

const HabitCard = ({habit,onDelete}) => {
  return (
    <li className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        <HabitInfo onDelete={onDelete} habit={habit}/>
        <HabitProgress />
      </div>
    </li>
  );
};

export default HabitCard;
