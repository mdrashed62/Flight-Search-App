import { useState } from "react";
import { FaGlobe, FaHeart, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <button className="text-xl font-bold text-[#498AD9]">
            ✈️ FlightFinder
          </button>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        <div
          className={`md:flex md:space-x-1  md:bg-white bg-gray-200 md:px-0 px-2 rounded-sm md:space-y-0 space-y-3  text-gray-700 font-medium ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="flex items-center gap-2 ">
            <Link to="/help" className="relative group">
              <span className="">Help</span>
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          <div className="flex items-center md:hover:bg-gray-200 md:px-2 md:py-1 rounded-sm">
            <FaGlobe className="text-lg" />
          </div>

          <div className="flex items-center md:hover:bg-gray-200 md:px-2 md:py-1 rounded-sm">
            <Link to="/favorites">
              <FaHeart className="md:text-lg" />
            </Link>
          </div>

          <div className="flex items-center md:hover:bg-gray-200 md:px-2 md:py-1 rounded-sm">
            <Link
              to="/login"
              className="flex items-center gap-2"
            >
              <FaUser />
              <span className="font-bold">Log in</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
