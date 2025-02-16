import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
   
<div className="flex flex-row p-4 gap-8 justify-center from-teal-500 to-cyan-600 shadow-lg rounded-2xl max-w-3xl mx-auto ">
  <NavLink 
    to="/" 
    className="text-white text-2xl font-semibold tracking-wide hover:text-blue-900 transition"
  >
    Home
  </NavLink>
  <NavLink 
    to="/pastes" 
    className="text-white text-2xl font-semibold tracking-wide hover:text-blue-900 transition"
  >
    Paste
  </NavLink>
</div>


  );
};

export default Navbar;
 