import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../firebase.config";

const HabitForm = ({ onHabitAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user] = useAuthState(auth);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.log("El usuario no está autenticado");
      return;
    }

    // Validate form fields
    const newErrors = {};
    if (!name) {
      newErrors.name = "El nombre del hábito es requerido";
    }

    if (!description) {
      newErrors.description = "La descripción del hábito es requerida";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userId = user.uid;
    const habit = {
      userId,
      name,
      description,
      completed: false,
      startTime: moment().toDate(),
    };

    // Add new habit to Firebase Firestore
    const habitsCollection = collection(db, "habits");
    const docRef = await addDoc(habitsCollection, habit);
    const habitId = docRef.id;
    const newHabit = { id: habitId, ...habit };
    await updateDoc(docRef, { habitId });

    // Clear form and call onHabitAdded function
    setName("");
    setDescription("");
    setErrors({});
    onHabitAdded(newHabit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Nombre del hábito
        </label>
        <input
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.name ? "border-red-500" : ""
          }`}
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={() =>
            setErrors({
              ...errors,
              name: !name ? "El nombre del hábito es requerido" : "",
            })
          }
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Descripción del hábito
        </label>
        <textarea
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.description ? "border-red-500" : ""
          }`}
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onBlur={() =>
            setErrors({
              ...errors,
              description: !description
                ? "La descripción del hábito es requerida"
                : "",
            })
          }
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">{errors.description}</p>
        )}
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

HabitForm.propTypes = {
  onHabitAdded: PropTypes.func.isRequired,
};

export default HabitForm;
