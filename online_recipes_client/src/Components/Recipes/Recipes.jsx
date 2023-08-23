import React from "react";
import sampleImage from "../../Assets/HomePage/right.jpg";
import "./Recipes.css";

const Recipes = () => {
  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ' recipes
      </h1>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        <div className="h-fit w-56 bg-white rounded-md hover:scale-105 transition-all cursor-pointer pb-2 card">
          <img
            src={sampleImage}
            alt=""
            className="aspect-square w-full object-cover rounded-sm"
          />
          <div className="w-full px-5">
            <h2 className="text-xl tracking-wider">Title</h2>
            <p>
              By <strong>Name</strong>
            </p>
          </div>
          <div w-full>
            <p className="text-red-500">
              <strong>10</strong> Likes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
