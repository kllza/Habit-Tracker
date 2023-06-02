import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { auth } from "../../../../firebase.config";

const HabitChart = ({ habitId }) => {
  const [weeklyStats, setWeeklyStats] = useState([]);

  useEffect(() => {
    const fetchWeeklyStats = () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const localStorageKey = `habit-${userId}-${habitId}-stats`;

        const storedStats = JSON.parse(localStorage.getItem(localStorageKey));
        if (storedStats) {
          setWeeklyStats(storedStats);
        }
      }
    };

    fetchWeeklyStats();
  }, [habitId]);
  //Cambie esto lo rellene con habitId

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Estadísticas semanales</h2>
      {weeklyStats.map((stat, index) => (
        <div key={index}>
          <h3>{`Semana ${index + 1}`}</h3>
          <p>Total de veces cumplido esa semana: {stat.completedCount}</p>
          <p>
            Porcentaje de cumplimiento semana11l:{" "}
            {((stat.completedCount / 7) * 100).toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
};

HabitChart.propTypes = {
  habitId: PropTypes.string.isRequired,
};

export default HabitChart;
