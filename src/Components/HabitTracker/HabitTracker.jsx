import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";

const HabitTracker = ({ habitId }) => {
  const [completed, setCompleted] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  const daysOfWeek = ["D", "L", "M", "X", "J", "V", "S"];

  const saveHabitData = () => {
    const userId = auth.currentUser.uid;
    const habitRef = doc(db, "habits", userId, habitId);

    setDoc(habitRef, {
      completed: completed ?? [],
      completedCount: completedCount ?? 0,
    })
      .then(() => {
        console.log("Habit data saved successfully");
      })
      .catch((error) => {
        console.log("Error saving habit data:", error);
      });
  };

  const saveWeeklyStats = () => {
    const weekStart = new Date();
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const userId = auth.currentUser.uid;
    const weeklyStatsRef = collection(db, "habits", userId, habitId, "weeklyStats");

    addDoc(weeklyStatsRef, {
      weekStart: weekStart,
      weekEnd: weekEnd,
      completed: completed || [],
      completedCount: completedCount || 0,
    })
      .then(() => {
        console.log("Weekly stats saved successfully");
      })
      .catch((error) => {
        console.log("Error saving weekly stats:", error);
      });
  };

  const handleCompletion = (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
    setCompletedCount(updatedCompleted.filter((day) => day).length);
  };

  const handleReset = () => {
    setCompleted(Array(7).fill(false));
    setCompletedCount(0);
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentWeekStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );

    if (currentDate.getDay() === 0) {
      saveWeeklyStats();
      handleReset();
    }
  }, []);

  useEffect(() => {
    saveHabitData();
  }, [completed, completedCount]);

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const habitRef = doc(db, "habits", userId, habitId);

      getDoc(habitRef)
        .then((doc) => {
          if (doc.exists()) {
            const habitData = doc.data();
            setCompleted(habitData.completed || []);
            setCompletedCount(habitData.completedCount || 0);
          }
        })
        .catch((error) => {
          console.log("Error getting habit document:", error);
        });
    }
  }, []);

  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-2">Hábito</h2>
        <p className="mb-4">
          Estado de cumplimiento:{" "}
          {completedCount === 7 ? "Completado" : "No completado"}
        </p>
        <div className="flex mb-2">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`w-10 h-10 border border-gray-300 flex items-center justify-center cursor-pointer ${
                completed[index] ? "line-through bg-gray-200" : ""
              }`}
              onClick={() => handleCompletion(index)}
            >
              {day}
            </div>
          ))}
        </div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          No cumplí con el hábito
        </button>
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-2">Estadísticas</h2>
        <p>Total de veces cumplido esta semana: {completedCount}</p>
        <p>
          Porcentaje de cumplimiento semanal:{" "}
          {((completedCount / 7) * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default HabitTracker;
