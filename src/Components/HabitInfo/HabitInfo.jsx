const HabitInfo = ({ habit, onDelete }) => {
  const handleClick = () => {
    onDelete(habit.id);
  };
  return (
    <div className="bg-gray-300 mb-2">
      <h3 className="text-lg font-bold mb-2">{habit.name}</h3>
      <p className="text-gray-500 mb-2">{habit.description}</p>
      <span className="text-blue-500 font-medium">
        Objetivo diario: {habit.frequency} veces por semana
      </span>
      <div>
        <button onClick={handleClick}>Delete</button>
      </div>
    </div>
  );
};

export default HabitInfo;
