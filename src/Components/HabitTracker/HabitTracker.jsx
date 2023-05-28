import React, { useState } from "react";

const HabitTracker = () => {
  const [completed, setCompleted] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  const daysOfWeek = ["D", "L", "M", "X", "J", "V", "S"];

  const handleCompletion = (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
    setCompletedCount(updatedCompleted.filter((day) => day).length);
  };

  const handleReset = () => {
    setCompleted([]);
    setCompletedCount(0);
  };

  return (
    <div className="flex justify-between">
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-2">Hábito</h2>
        <p className="mb-4">Estado de cumplimiento: {completedCount === 7 ? "Completado" : "No completado"}</p>
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
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleReset}>
          No cumplí con el hábito
        </button>
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-2">Estadísticas</h2>
        <p>Total de veces cumplido esta semana: {completedCount}</p>
        <p>Porcentaje de cumplimiento semanal: {((completedCount / 7) * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default HabitTracker;
