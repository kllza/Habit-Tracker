import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/3.Organisms/Header/Header";
import HeroSection from "./Components/Template/HeroSection/HeroSection";
import FeaturesSection from "./Components/2.Molecules/FeaturesSection/FeaturesSection";
import HowItWorksSection from "./Components/2.Molecules/HowItWorksSection/HowItWorksSection";
import HabitsSection from "./Components/1.Atoms/HabitsSection/HabitsSection";
import AddHabitSection from "./Components/2.Molecules/AddHabitSection/AddHabitSection";
import Footer from "./Components/2.Molecules/Footer/Footer";
import Login from "./Components/1.Atoms/Login/Login";
import Register from "./Components/1.Atoms/Register/Register";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setUser(user);
        //console.log(user);
        console.log("Usuario Logeado");
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header authenticated={authenticated} user={user} />
        <main className="flex-grow">
          <Routes>
            <Route
              exact
              path="/"
              element={<HeroSection authenticated={authenticated} />}
            />
            <Route path="/features" element={<FeaturesSection />} />
            <Route path="/how-it-works" element={<HowItWorksSection />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/habits" element={<HabitsSection habits={habits} />} />
            <Route
              path="/add-habit"
              element={<AddHabitSection onHabitAdded={addHabit} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
