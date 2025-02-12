const Body = () => {
  return (
    <div className="">
      <div className="md:w-1/2 lg:w-1/3 xl:1/3 w-2/3 m-auto items-center pt-32 text-center">
        <form action="">
          <div className="border border-slate-400 rounded">
            <input type="text" className="w-full py-1.5 rounded px-3 outline-violet-400" />
          </div>
          <div>
            <button className="bg-violet-500 w-full mt-5 text-white py-2 rounded">Claim Airdrop</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Body;
