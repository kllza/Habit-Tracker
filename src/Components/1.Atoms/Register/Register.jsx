import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  AuthErrorCodes,
} from "firebase/auth";
import { auth } from "../../../../firebase.config";
import { useNavigate } from "react-router-dom";
import { setPersistence, browserSessionPersistence } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      const errorCode = error.code;
      let errorMessage = "";

      switch (errorCode) {
        case AuthErrorCodes.EMAIL_EXISTS:
          errorMessage = "El correo electrónico ya está en uso.";
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          errorMessage = "El correo electrónico no es válido.";
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          errorMessage = "La contraseña es demasiado débil.";
          break;
        default:
          errorMessage = "Ha ocurrido un error durante el registro.";
      }

      setError(errorMessage);
      
    }

    if (registrationSuccess) {
      console.log("Registro exitoso");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-4">Registrarse</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-4"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
