import HabitTracker from "../HabitTracker/HabitTracker";
import HabitChart from "../HabitChart/HabitChart";

const HabitProgress = () => {
  return (
    <div className="flex items-center">
      <HabitTracker />
      <HabitChart />
    </div>
  );
};

export default HabitProgress;
