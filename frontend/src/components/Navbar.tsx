import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="lg:py-4 lg:px-10 flex py-3  px-5 justify-between shadow-md  w-4/5 m-auto rounded-full bg-[#252A30]/90">
      <div className="flex">
        <div className="self-center">
          <Link to="/">
            <img src={logo} alt="katera logo" width={30} />
          </Link>
        </div>
        <div className="self-end lg:text-xl text-violet-500 font-medium">
          <p className="">atera</p>
        </div>
      </div>
      <div className="self-center">
        <motion.button
          className="bg-violet-500 lg:px-5 lg:py-2  py-1 px-2  rounded text-sm font-semibold text-white"
          whileHover={{
            scale: 1.05, // Slightly enlarges on hover
            backgroundColor: "#4F46E5", // Changes color on hover
            boxShadow: "0px 10px 20px rgba(79, 70, 229, 0.3)", // Adds a glow effect
          }}
          whileTap={{
            scale: 0.9, // Shrinks slightly on click
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Connect wallet
        </motion.button>
      </div>
    </div>
  );
};

export default Navbar;
