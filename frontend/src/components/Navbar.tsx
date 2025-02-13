import logo from "../assets/logo2.png"

const Navbar = () => {
  return (
    <div className="py-5 px-16 flex justify-between shadow-md">
      <div>
         <img src={logo} alt="katera logo" width={35}/>
      </div>

      <div>
         <button className="bg-violet-500 px-5 py-3 rounded text-sm font-semibold text-white">Connect wallet</button>
      </div>
    </div>
  )
}

export default Navbar