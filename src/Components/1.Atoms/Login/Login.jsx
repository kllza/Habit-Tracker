import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase.config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null); // Reiniciar el mensaje de error

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        let errorMessage = "Ocurrió un error durante el inicio de sesión.";

        // Obtener el código de error
        const errorCode = error.code;

        // Mostrar mensajes genéricos para los errores comunes
        if (errorCode === "auth/user-not-found") {
          errorMessage = "Correo electrónico no encontrado.";
        } else if (errorCode === "auth/wrong-password") {
          errorMessage = "Contraseña incorrecta.";
        }

        setError(errorMessage); // Establecer el mensaje de error
        console.log(errorMessage);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl mb-4">Iniciar sesión</h1>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
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
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-4 py-2 rounded mt-4"
          >
            Iniciar sesión
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
