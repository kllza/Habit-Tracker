import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HabitsList from "../../2.Molecules/HabitsList/HabitsList";

const HabitsSection = () => {
  const [habits, setHabits] = useState([]);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleHabits = (habitsData) => {
    setHabits(habitsData);
  };

  return (
    <section className="bg-white py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Mis hábitos</h2>
        {userId && <HabitsList userId={userId} onHabitsFetched={handleHabits} />}
      </div>
    </section>
  );
};

export default HabitsSection;
