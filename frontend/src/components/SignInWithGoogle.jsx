import { auth, provider, db } from "../firebase";

//Redux
import { useDispatch } from "react-redux";
import { setDatos } from "../store/Slices/Usuario";
//Firebase
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

//Funcion para iniciar sesion con google
export const SignInWithGoogle = () => {
  const dispatch = useDispatch();

  const handleSignInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        //Agregar id al localstorage
        localStorage.setItem("id", result.user.uid);
        //Referencia para buscar el documento
        const docRef = doc(db, "usuarios", result.user.uid);
        //Buscando el documento en firestore
        const docSnap = await getDoc(docRef);
        //Condicional si existe
        if (docSnap.exists()) {
          const usuario = docSnap.data();
          dispatch(setDatos(usuario));
        } else {
          const dataUser = {
            nombre: result.user.displayName,
            email: result.user.email,
            telefono: result.user.phoneNumber,
            foto: result.user.photoURL,
            carrito: [],
          };
          dispatch(setDatos(dataUser));
          await setDoc(doc(db, "usuarios", result.user.uid), dataUser);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return handleSignInWithGoogle;
};
