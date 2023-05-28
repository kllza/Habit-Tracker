import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { onSnapshot, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import imgDefault from "../../assets/profile_lion.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ProfileImageUpload from "../ProfileImageUpload/ProfileImageUpload";
import { useRef } from "react";

const Profile = ({ user }) => {
  const username = user.email.split("@")[0];
  const defaultAvatar = imgDefault; // Reemplaza esto con la URL de tu imagen predeterminada
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const firestore = getFirestore();
  useEffect(() => {
    const userDocRef = doc(firestore, "users", user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setImageUrl(docSnapshot.data().profileImageUrl);
      } else {
        console.log("El documento no existe en Firestore");
        setImageUrl(""); // Establece la URL de la imagen en una cadena vacía si el documento no existe
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log("Sesion cerrada");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageClick = () => {
    inputFileRef.current.click();
  };
  const inputFileRef = useRef();

  return (
    <div className="flex items-center">
      <div className="w-14 h-14 relative">
        <img
          className="rounded-full w-full h-full object-cover"
          src={imageUrl || user.photoURL || defaultAvatar}
          alt="ProfileImg"
          onClick={handleProfileImageClick}
        />
        <ProfileImageUpload
          ref={inputFileRef}
          userId={user.uid}
          onImageUrlUpdate={setImageUrl}
          className="absolute bottom-0 right-0"
        />
      </div>
      <div className="ml-2">
        <h3 className="text-lg font-medium">{username}</h3>
        <button
          className="text-purple-500 hover:text-purple-700"
          onClick={handleSignOut}
          disabled={loading}
        >
          {loading ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
