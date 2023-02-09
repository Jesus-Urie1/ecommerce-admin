import { FiShoppingCart } from "react-icons/fi";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-20">
      <nav className="w-full h-20 bg-[#b959f1]  flex">
        <div className="flex justify-center w-full">
          <img src="logosegundoround.jpg" />
        </div>

        <div className="mr-5 flex items-center">
          <FiShoppingCart className="w-8 h-8 cursor-pointer" color="white" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
