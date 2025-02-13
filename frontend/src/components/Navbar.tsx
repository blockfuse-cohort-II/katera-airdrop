import logo from "../assets/logo2.png"
import { ConnectButton } from '@rainbow-me/rainbowkit';



const Navbar = () => {
  return (
    <div className="py-5 px-16 flex justify-between shadow-md">
      <div>
         <img src={logo} alt="katera logo" width={35}/>
      </div>

      <div>
        <ConnectButton/>
      </div>
    </div>
  )
}

export default Navbar