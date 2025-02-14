
import { useState,useEffect, ChangeEvent } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

import Footer from "./Footer";
import { motion } from "framer-motion";


const Body = () => {
  const { address } = useAccount(); 
  const [userAddress, setUserAddress] = useState(""); 
  const [amount, setAmount]=useState("");

  useEffect(() => {
      if (address) {
          setUserAddress(address);
      }
  }, [address]); 

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setAmount(e.target.value)
  }

  const handleClick = (e) => {
      e.preventDefault();
      console.log("User address:", userAddress);
      console.log(amount)
      setAmount("")
  };



  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="pt-24">
          <h1 className="text-center text-3xl font-semibold pb-3 pt-32 text-white">
            Claim Katera Airdrop
          </h1>
          <div className="md:w-1/2 lg:w-1/4 xl:1/4 w-2/3 m-auto items-center pt-5 text-center">
            <form action="">
              <div className="border border-slate-400 rounded">
                <input
                  type="text"
                  className="w-full py-1.5 rounded px-3 outline-violet-400 text-white text-" 
                  placeholder="Input amount you are elligible for..."
                  value={amount}
                  onChange={handleChange}
                />
              </div>
              <div>
                <motion.button className="bg-violet-500 w-full mt-5 text-white py-2 rounded font-semibold"
                    whileHover={{
                      scale: 1.05, // Slightly enlarges on hover
                      backgroundColor: "#4F46E5", // Changes color on hover
                      boxShadow: "0px 10px 20px rgba(79, 70, 229, 0.3)", // Adds a glow effect
                    }}
                    whileTap={{
                      scale: 0.9, // Shrinks slightly on click
                    }}
                    transition={{ type: "spring", stiffness: 300 }}

                    onClick={handleClick}
                >
                  Claim Airdrop
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Body;