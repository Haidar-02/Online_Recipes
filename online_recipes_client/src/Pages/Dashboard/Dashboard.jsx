import React, { useState } from "react";
import "./Dashboard.css";
import recipeIcon from "../../Assets/Icons/recipe.png";
import createIcon from "../../Assets/Icons/create.png";
import searchIcon from "../../Assets/Icons/search.png";
import scheduleIcon from "../../Assets/Icons/schedule.png";
import cartIcon from "../../Assets/Icons/cart.png";
import Recipes from "../../Components/Recipes/Recipes";
import Search from "../../Components/Search/Search";
import Create from "../../Components/Create/Create";
import Plan from "../../Components/Plan/Plan";
import ShopList from "../../Components/ShopList/ShopList";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Helpers/auth.helpers";

const falseState = {
  recipes: false,
  search: false,
  create: false,
  plan: false,
  shopList: false,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    recipes: true,
    search: false,
    create: false,
    plan: false,
    shopList: false,
  });
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.data) {
        localStorage.clear();
        navigate("/");
      }
    } catch (e) {
      console.log("Error logging out");
    }
  };

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { recipes, search, create, plan, shopList } = state;
  return (
    <div className="h-full w-full bg-gray-300 flex-col gap-5">
      <div className="flex w-full items-center justify-center gap-10 py-5 bg-gray-100 shadow-lg">
        <div
          onClick={async () => togglePage("recipes")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          <img src={recipeIcon} alt="" className="w-6 mr-2 float-left" />
          Recipes
        </div>
        <div
          onClick={async () => togglePage("search")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          <img src={searchIcon} alt="" className="w-6 mr-2 float-left" />
          Search
        </div>
        <div
          onClick={async () => togglePage("create")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          <img src={createIcon} alt="" className="w-6 mr-2 float-left" />
          Create
        </div>
        <div
          onClick={async () => togglePage("plan")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          <img src={scheduleIcon} alt="" className="w-6 mr-2 float-left" />
          Meal Plans
        </div>
        <div
          onClick={async () => togglePage("shopList")}
          className="flex items-center justify-center p-2 px-4 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer transition-all"
        >
          <img src={cartIcon} alt="" className="w-6 mr-2 float-left" />
          Shopping List
        </div>
        <button
          onClick={handleLogout}
          className="py-1 px-3 rounded-full bg-red-500 text-white hover:opacity-75"
        >
          Logout
        </button>
      </div>
      <div className="w-full h-full p-10">
        {recipes && <Recipes />}
        {search && <Search />}
        {create && <Create />}
        {plan && <Plan />}
        {shopList && <ShopList />}
      </div>
    </div>
  );
};

export default Dashboard;
