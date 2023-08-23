import React, { useState, useEffect } from "react";
import AddItemsToBuy from "./AddItemsToBuy";
import { getShoppingListItems } from "../../Helpers/recipes.helpers";

const ShopList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shoppingListItems, setShoppingListItems] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchShoppingListItems = async () => {
    try {
      const response = await getShoppingListItems();
      const items = response.items;
      setShoppingListItems(items);
      console.log(items);
    } catch (error) {
      console.error("Error fetching shopping list items:", error);
    }
  };

  useEffect(() => {
    fetchShoppingListItems();
  }, []);

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
      <div className="flex flex-wrap mt-5 gap-3">
        {shoppingListItems.map((item) => (
          <div key={item.id} className="bg-gray-700 text-white p-3 rounded-lg">
            <p>{item.item_name}</p>
          </div>
        ))}
      </div>
      <AddItemsToBuy
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchShoppingListItems={fetchShoppingListItems}
      />
    </div>
  );
};

export default ShopList;
