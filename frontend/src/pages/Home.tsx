// import tokenImg from "../assets/floatingtokens.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import token from "../assets/8737bbc4-3f20-4023-a7ad-feae2d645377.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="">
      <div className="min-h-screen bg-gradient-to-r from-[#222222] to-[#252A30]">
        <div className="fixed w-full mt-5">
          <Navbar />
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 px-5 lg:px-32 min-h-screen">
          <div className="self-center lg:pt-0 pt-28">
            <div className="text-white">
              <h1 className="text-violet-500 font-semibold text-5xl">
                Katera Wallet
              </h1>
              <p className="text-lg mt-3 ">
                Claim your free airdrop now—connect your wallet and grab your
                tokens before the window closes!
              </p>
            </div>

            <div className="mt-10">
              <motion.button
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
                <Link
                  to="/claim-airdrop"
                  className="text-white bg-violet-500 font-semibold px-5 py-3 rounded text-sm"
                >
                  Proceed to claim airdrop
                </Link>
              </motion.button>
            </div>
          </div>

          {/* <div> */}
          <motion.img
            src={token}
            alt="moving image"
            className="lg:self-center"
            animate={{
              x: ["0%", "10%", "-10%", "5%", "-5%"], // Moves randomly in x direction
              y: ["0%", "-5%", "10%", "-7%", "3%"], // Moves randomly in y direction
            }}
            transition={{
              duration: 50, // Slower movement
              repeat: Infinity, // Infinite loop
              ease: "easeInOut", // Smooth floating effect
            }}
          />
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
