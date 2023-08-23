import React, { useState } from "react";
import sampleImage from "../../Assets/HomePage/right.jpg";
import { searchRecipes } from "../../Helpers/recipes.helpers";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("1"); // Default criteria: By Name
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const formData = new FormData();
      formData.append("criteria", searchCriteria);
      formData.append("text", searchQuery);

      const response = await searchRecipes(formData);
      const recipes = response.recipes;
      setSearchResults(recipes);
      console.log(recipes, searchCriteria, searchQuery);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

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
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          className="p-2  text-white border-1 border-yellow-600 bg-yellow-600 transition-all hover:opacity-70"
          onClick={handleSearch}
        >
          Search
        </button>
        <select
          name="criteria"
          className="form-element p-2 ml-2"
          value={searchCriteria}
          onChange={handleSearchCriteriaChange}
        >
          <option value="1">By Name</option>
          <option value="2">By Cuisine</option>
          <option value="3">By Ingredient</option>
        </select>
      </div>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="h-fit w-56 bg-white rounded-md hover:scale-105 transition-all cursor-pointer pb-2 card"
          >
            <img
              src={`http://127.0.0.1:8000/api/user/images/${result.image_url}`}
              alt=""
              className="aspect-square w-full object-cover rounded-sm"
            />
            <div className="w-full px-5">
              <h2 className="text-xl tracking-wider">{result.title}</h2>
              <p>
                By <strong>{result.user.name}</strong>
              </p>
            </div>
            <div w-full>
              <button
                onClick={() => navigate(`/recipe/${result.id}`)}
                className="text-white bg-gray-700 px-3 py-1 rounded-full hover:bg-yellow-600 transition-all cursor-pointer"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
