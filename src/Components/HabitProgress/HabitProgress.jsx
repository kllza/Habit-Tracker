import { useEffect, useState } from "react";
import HabitTracker from "../HabitTracker/HabitTracker";

import HabitChart from "../HabitChart/HabitChart";

const HabitProgress = ({ habit, habitId }) => {
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
        <HabitChart habitId={habit} />
      </div>
    </div>
  );
};

export default HabitProgress;
