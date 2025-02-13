import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="lg:py-4 lg:px-10 flex py-3  px-5 justify-between shadow-md  w-4/5 m-auto rounded-full bg-[#2A2A2A]/90">
      <div className="flex">
        <div className="self-center">
          <Link to="">
            <img src={logo} alt="katera logo" width={30} />
          </Link>
        </div>
        <div className="self-end lg:text-xl text-violet-500 font-medium">
          <p className="">atera</p>
        </div>
      </div>
      <div className="self-center">
        <button className="bg-violet-500 lg:px-5 lg:py-2  py-1 px-2  rounded text-sm font-semibold text-white">
          Connect wallet
        </button>
      </div>
    </div>
  );
};

export default Navbar;
