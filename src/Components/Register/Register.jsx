import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      await signOut(auth);
      setRegistrationSuccess(true);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }

    if (registrationSuccess) {
      console.log("Registro exitoso");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-4">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col items-center">
          <label className="block mb-2">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 px-4 py-2 mb-4"
            required
          />
          <label className="block mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-400 px-4 py-2 mb-4"
            minLength="6"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
