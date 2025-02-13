import { useState,useEffect } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

const Body = () => {
  const { address } = useAccount(); 
  const [userAddress, setUserAddress] = useState(""); 

  useEffect(() => {
      if (address) {
          setUserAddress(address);
      }
  }, [address]); 

  const handleClick = (e) => {
      e.preventDefault();
      console.log("User address:", userAddress);
  };



  return (
    <div>
      <div>
        <form>
          <div>
            <input type="text" />
          </div>
          <div>
            <button onClick={handleClick}>Claim Airdrop</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Body;