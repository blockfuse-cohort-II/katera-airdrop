import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <div className="pt-24">
          <h1 className="text-center text-xl font-semibold pt-32 text-white">
            Claim Katera Faucet
          </h1>
          <div className="md:w-1/2 lg:w-1/4 xl:1/4 w-2/3 m-auto items-center pt-5 text-center">
            <form action="">
              <div className="border border-slate-400 rounded">
                <input
                  type="text"
                  className="w-full py-1.5 rounded px-3 outline-violet-400 text-white text-" 
                  placeholder="Input amount you are elligible for..."
                />
              </div>
              <div>
                <button className="bg-violet-500 w-full mt-5 text-white py-2 rounded font-semibold">
                  Claim Airdrop
                </button>
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
