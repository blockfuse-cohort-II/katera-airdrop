// import tokenImg from "../assets/floatingtokens.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import token from "../assets/8737bbc4-3f20-4023-a7ad-feae2d645377.png"

const Home = () => {
  return (
    <div className="">
      <div className="min-h-screen bg-gradient-to-r from-[#222222] to-[#2D2D2D]">
        <div className="fixed w-full mt-5">
          <Navbar />
        </div>

        <div className="grid grid-cols-2 px-5 lg:px-32 min-h-screen">
          <div className="self-center">
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
              <Link
                to="/claim-airdrop"
                className="text-white bg-violet-500 font-semibold px-5 py-3 rounded text-sm"
              >
                Proceed to claim airdrop
              </Link>
            </div>
          </div>

          {/* <div> */}
          <img src={token} alt="" className="self-center" />
          {/* </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
