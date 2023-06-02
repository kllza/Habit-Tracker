import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import HabitCard from "../HabitCard/HabitCard";

const HabitsList = ({ userId, onHabitsFetched }) => {
  const [habits, setHabits] = useState([]);
  const db = getFirestore();

  const deleteHabit = async (habitId) => {
    // Aquí va la lógica para eliminar el hábito de la base de datos
    // Crear una referencia al documento del hábito en la base de datos
    const habitRef = doc(db, "habits", habitId);

    // Eliminar el documento utilizando la referencia
    await deleteDoc(habitRef);

    console.log("Hábito eliminado:", habitId);
  };

  useEffect(() => {
    const habitsQuery = query(
      collection(db, "habits"),
      where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(habitsQuery, (querySnapshot) => {
      const habitsData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        habitsData.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          completed: data.completed,
        });
      });
      setHabits(habitsData);
      onHabitsFetched(habitsData);
    });

    return () => {
      unsubscribe();
    };
  }, [db, userId, onHabitsFetched]);

  return (
    <div>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onDelete={deleteHabit}
          habitId={habit.id}
        ></HabitCard>
      ))}
    </div>
  );
};

HabitsList.propTypes = {
  userId: PropTypes.string.isRequired,
  onHabitsFetched: PropTypes.func.isRequired,
};

export default HabitsList;
