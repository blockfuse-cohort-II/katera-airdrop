import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Claim from "./pages/Claim";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claim-airdrop" element={<Claim />} />
      </Routes>
    </div>
  );
}

export default App;
