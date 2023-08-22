import React from "react";
import "./Homepage.css";
import home_bg from "../../Assets/HomePage/home_bg.jpg";
import { useNavigate } from "react-router-dom";

const Hompage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="w-full h-96 absolute z-10  font-black flex-col items-center justify-center bg-gradient-to-b from-gray-500 via-black/10 to-transparent cursor-default tracking-widest px-10">
        <div className="text-6xl uppercase text-white p-5 px-10 w-full  rounded-full flex items-center justify-center mt-10 text-shadow">
          Your Kitchen is Now <span className="text-red-800"> Online</span>
        </div>
        <div className="flex-col items-center justify-center mt-10 bg-white rounded-full p-5 bg-opacity-75">
          <h2 className="text-center text-xl font-bold uppercase font-small-caps">
            Discover & Share Many recipes of different Cuisines World Wide
          </h2>
          <div className="flex items-center justify-center mt-5">
            <button
              className="p-2 px-5 bg-green-600 text-white rounded-full font-normal m-5 hover:opacity-75 transition-all"
              onClick={() => navigate("/register")}
            >
              JOIN NOW
            </button>
            <h2 className="font-normal">- OR -</h2>
            <button
              className="p-2 px-5 bg-cyan-700 text-white rounded-full font-normal m-5 hover:opacity-75 transition-all"
              onClick={() => navigate("/login")}
            >
              SIGN IN
            </button>
          </div>
        </div>
      </header>

      <img
        src={home_bg}
        alt="home-background"
        className="absolute h-full w-full object-cover shadow-2xl"
      />
    </div>
  );
};

export default Hompage;
