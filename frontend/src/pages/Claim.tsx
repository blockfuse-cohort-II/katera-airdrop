import Navbar from "../components/Navbar";
import Body from "../components/Body";

const Claim = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#222222] to-[#2D2D2D]">
      <div className="fixed mt-5 w-full">
        <Navbar />
      </div>
      <div>
        <Body />
      </div>
    </div>
  );
};

export default Claim;
