import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase.config";

const HabitChart = () => {
  const [weeklyStats, setWeeklyStats] = useState([]);

  const fetchWeeklyStats = async () => {
    console.log("Fetching weekly stats...");
    const userId = auth.currentUser.uid;
    const weeklyStatsRef = collection(db, "weeklyStats");
    const weeklyStatsSnapshot = await getDocs(weeklyStatsRef);
    const stats = weeklyStatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setWeeklyStats(stats);
    console.log("Weekly stats updated:", stats);
  };

  useEffect(() => {
    fetchWeeklyStats();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Estadísticas semanales</h2>
      {weeklyStats.map((stat) => (
        <div key={stat.id}>
          <h3>{`Semana ${stat.id}`}</h3>
          <p>Total de veces cumplido esa semana: {stat.completedCount}</p>
          <p>
            Porcentaje de cumplimiento semanal:{" "}
            {((stat.completedCount / 7) * 100).toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default HabitChart;
