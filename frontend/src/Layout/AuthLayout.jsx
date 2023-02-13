import { Outlet } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setDatos } from "../store/Slices/Usuario";

const AuthLayout = () => {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (id) {
        const docRef = doc(db, "usuarios", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const usuario = docSnap.data();
          dispatch(setDatos(usuario));
        } else {
          // Doc.data () no estará definido en este caso
          console.log("¡No hay tal documento!");
        }
      } else {
        dispatch(setDatos({}));
      }
    };
    obtenerUsuario();
  }, [id]);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
