import React, { useState } from "react";
import sampleImage from "../../Assets/HomePage/right.jpg";
import "./Recipes.css";
import { useNavigate } from "react-router-dom";
import RecipeModal from "./RecipeModal/RecipeModal";

const Recipes = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  const items = [
    {
      title: "Title 1",
      author: "Author 1",
      image: sampleImage,
    },
    // Add more items here
  ];
  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ' recipes
      </h1>
      <div className="w-full flex flex-wrap mt-5 items-center justify-center gap-7">
        {items.map((item) => (
          <div
            key={item.id}
            className="h-fit w-56 bg-white rounded-md hover:scale-105 transition-all cursor-default pb-2 card"
          >
            <img
              src={item.image}
              alt=""
              className="aspect-square w-full object-cover rounded-sm"
            />
            <div className="w-full px-5">
              <h2 className="text-xl tracking-wider">{item.title}</h2>
              <p>
                By <strong>{item.author}</strong>
              </p>
            </div>
            <div w-full>
              <button
                onClick={() => openModal(item)}
                className="text-white bg-gray-700 px-3 py-1 rounded-full hover:bg-yellow-600 transition-all cursor-pointer"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <RecipeModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Recipes;
