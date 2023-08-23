import React from "react";
import sampleImage from "../../Assets/HomePage/right.jpg";

const Search = () => {
  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ' Search
      </h1>
      <div className="m-3">
        <input
          type="text"
          name="content"
          placeholder="search for recipes"
          className="p-2 w-72 form-element"
        />
        <button className="p-2  text-white border-1 border-yellow-600 bg-yellow-600 transition-all hover:opacity-70">
          Search
        </button>
        <select name="criteria" className="form-element p-2 ml-2">
          <option value="1">By Name</option>
          <option value="2">By Cuisine</option>
          <option value="3">By Ingredient</option>
        </select>
      </div>
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
            <button className="text-white bg-gray-700 px-3 py-1 rounded-full hover:bg-yellow-600 transition-all cursor-pointer">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
