import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row p-3 sm:p-4 gap-4 sm:gap-8 justify-center from-teal-500 to-cyan-600 shadow-lg rounded-xl sm:rounded-2xl max-w-3xl mx-auto w-full">
      <NavLink 
        to="/" 
        className="text-white text-lg sm:text-xl md:text-2xl font-medium sm:font-semibold tracking-wide hover:text-blue-900 transition"
      >
        Home
      </NavLink>
      <NavLink 
        to="/pastes" 
        className="text-white text-lg sm:text-xl md:text-2xl font-medium sm:font-semibold tracking-wide hover:text-blue-900 transition"
      >
        Paste
      </NavLink>
    </div>
  );
};

export default Navbar;
 