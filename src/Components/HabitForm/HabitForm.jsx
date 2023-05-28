import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase.config";
import moment from 'moment';


const HabitForm = ({ onHabitAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user] = useAuthState(auth);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.log("El usuario no está autenticado");
      return;
    }

    const userId = user.uid;
    const habit = { userId, name, description, completed: false,  startTime: moment().toDate(),};

    // Agregar el nuevo hábito a Firebase Firestore
    const habitsCollection = collection(db, "habits");
    const docRef = await addDoc(habitsCollection, habit);
    const habitId = docRef.id;
    const newHabit = { id: habitId, ...habit };
    // Actualiza el documento habit con el habitId
  await updateDoc(docRef, { habitId });

    // Limpiar el formulario y llamar a la función onHabitAdded
    setName("");
    setDescription("");
    onHabitAdded(newHabit);
    console.log(newHabit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Nombre del hábito
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Descripción del hábito
        </label>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Agregar hábito
      </button>
    </form>
  );
};

export default HabitForm;
