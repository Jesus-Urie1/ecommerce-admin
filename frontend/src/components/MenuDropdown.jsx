import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setCarrito, setDatos } from "../store/Slices/Usuario";
const MenuDropdown = ({ menuDropdown, setMenuDropdown }) => {
  const auth = getAuth();
  const dispatch = useDispatch();

  const signOutOnClick = () => {
    signOut(auth)
      .then(() => {
        dispatch(setDatos({}));
        dispatch(setCarrito([]));
        localStorage.removeItem("id");
        setMenuDropdown(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {menuDropdown && (
        <div className="dropdown relative top-0 -left-24">
          <ul
            className="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 
          list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
          >
            <li>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent
            text-gray-700 hover:bg-gray-100"
                href="#"
              >
                Actualizar datos
              </a>
            </li>
            <li>
              <a
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent
            text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => signOutOnClick()}
              >
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MenuDropdown;
