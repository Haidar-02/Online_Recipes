import React, { useState } from "react";
import AddItemsToBuy from "./AddItemsToBuy";

const ShopList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ' Shop List
      </h1>
      <div className="mt-2">
        <button
          onClick={openModal}
          className="p-2 bg-yellow-600 text-white hover:opacity-75 transition-all rounded-md"
        >
          Add New Items To Buy
        </button>
      </div>
      <AddItemsToBuy isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default ShopList;
