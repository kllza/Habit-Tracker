import React, { useState, useEffect } from "react";
import { auth } from "../../../../firebase.config";

const HabitTracker = ({ habitId }) => {
  const [completed, setCompleted] = useState(() => {
    const localStorageKey = `habit-${habitId}-completed`;
    const storedCompleted = JSON.parse(localStorage.getItem(localStorageKey));
    return storedCompleted || Array.from({ length: 7 }, () => false);
  });

  const [completedCount, setCompletedCount] = useState(() => {
    const localStorageKey = `habit-${habitId}-completed-count`;
    const storedCompletedCount = JSON.parse(
      localStorage.getItem(localStorageKey)
    );
    return storedCompletedCount || 0;
  });

  const daysOfWeek = ["D", "L", "M", "X", "J", "V", "S"];

  useEffect(() => {
    const localStorageKey = `habit-${habitId}-completed`;
    localStorage.setItem(localStorageKey, JSON.stringify(completed));
  }, [completed, habitId]);

  useEffect(() => {
    const localStorageKey = `habit-${habitId}-completed-count`;
    localStorage.setItem(localStorageKey, JSON.stringify(completedCount));
  }, [completedCount, habitId]);

  const handleCompletion = (index) => {
    const newCompleted = [...completed];
    newCompleted[index] = !newCompleted[index];
    setCompleted(newCompleted);
    setCompletedCount(newCompleted.filter((completed) => completed).length);
  };

  const handleReset = () => {
    setCompleted(Array.from({ length: 7 }, () => false));
    setCompletedCount(0);
  };

  return (
    <div className="flex">
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