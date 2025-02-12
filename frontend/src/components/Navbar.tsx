import logo from "../assets/logo2.png"

const Navbar = () => {
  return (
    <div className="lg:py-5 lg:px-16 flex py-3  px-5 justify-between shadow-md">
      <div>
         <img src={logo} alt="katera logo" width={35}/>
      </div>

      <div className="self-center">
         <button className="bg-violet-500 lg:px-5 lg:py-3  py-1 px-2  rounded text-sm font-semibold text-white">Connect wallet</button>
      </div>
    </div>
  )
}

export default Navbar