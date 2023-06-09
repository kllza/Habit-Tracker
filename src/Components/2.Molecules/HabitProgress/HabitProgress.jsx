import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HabitTracker from "../../1.Atoms/HabitTracker/HabitTracker";

const HabitProgress = ({ habitId }) => {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const localStorageKey = `habit-${habitId}-completed`;

    const storedCompleted = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedCompleted) {
      setCompleted(storedCompleted);
    }
  }, [habitId]);

  useEffect(() => {
    const localStorageKey = `habit-${habitId}-completed`;
    localStorage.setItem(localStorageKey, JSON.stringify(completed));
  }, [completed, habitId]);
  return (
    <div>
      <div>
        <HabitTracker
          habitId={habitId}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
    </div>
  );
};

HabitProgress.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  habitId: PropTypes.string.isRequired,
};

export default HabitProgress;
