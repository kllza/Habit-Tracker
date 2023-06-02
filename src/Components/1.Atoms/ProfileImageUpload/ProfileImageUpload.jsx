import PropTypes from "prop-types";
import { forwardRef } from "react";
import {
  ref as storageRefFunc,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { storage } from "../../../../firebase.config";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore();

const ProfileImageUpload = forwardRef(({ userId, onImageUrlUpdate }, ref) => {
  const handleProfileImageUpload = async (userId, imageFile) => {
    // Subir imagen a Firebase Storage
    const storageRef = storageRefFunc(storage, `profileImages/${userId}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // Guardar URL de la imagen en Firestore
    const userDocRef = doc(firestore, "users", userId);
    await setDoc(userDocRef, { profileImageUrl: imageUrl }, { merge: true });

    // Actualizar la imagen de perfil en la interfaz de usuario
    onImageUrlUpdate(imageUrl);
  };

  return (
    <div>
      <input
        ref={ref}
        type="file"
        onChange={(e) => handleProfileImageUpload(userId, e.target.files[0])}
        style={{ display: "none" }}
      />
    </div>
  );
});

ProfileImageUpload.displayName = "ProfileImageUpload";

ProfileImageUpload.propTypes = {
  userId: PropTypes.string.isRequired,
  onImageUrlUpdate: PropTypes.func.isRequired,
};

export default ProfileImageUpload;
