import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { RiUserLine } from "react-icons/ri";
import { SignInWithGoogle } from "./SignInWithGoogle.jsx";
import MenuDropdown from "./MenuDropdown.jsx";

//Redux
import { useSelector } from "react-redux";

const NavBar = () => {
  const id = localStorage.getItem("id");
  const redux = useSelector((state) => state.usuario);

  const [menuDropdown, setMenuDropdown] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      <nav className="w-full h-20 bg-[#b959f1] flex">
        <div className="flex justify-start ml-5 w-full">
          <img src="logosegundoround.jpg" />
        </div>

        <div className="mr-7 flex items-center gap-4">
          {id ? (
            <div className="flex flex-col">
              <img
                src={redux.datos.foto}
                className="w-10 h-8 rounded-full cursor-pointer"
                onClick={() => setMenuDropdown(!menuDropdown)}
              />
              <MenuDropdown
                menuDropdown={menuDropdown}
                setMenuDropdown={setMenuDropdown}
              />
            </div>
          ) : (
            <RiUserLine
              className="w-8 h-8 cursor-pointer"
              color="white"
              onClick={SignInWithGoogle()}
            />
          )}
          <div className="relative ">
            {id ? (
              <>
                {redux.datos.carrito && (
                  <div className="rounded-full bg-red-600 text-white px-2 absolute bottom-5 left-4">
                    {redux.datos.carrito.length}
                  </div>
                )}
              </>
            ) : (
              <></>
            )}

            <FiShoppingCart className="w-8 h-8 cursor-pointer" color="white" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
