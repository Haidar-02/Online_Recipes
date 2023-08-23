import React, { useState } from "react";
import Modal from "react-modal";
import { addItemToShoppingList } from "../../Helpers/recipes.helpers";

const MealModal = ({ isOpen, closeModal, fetchShoppingListItems }) => {
  const [itemName, setItemName] = useState("");

  const handleSubmit = async () => {
    try {
      const itemData = {
        item_name: itemName,
      };

      const response = await addItemToShoppingList(itemData);
      if (response.item) {
        fetchShoppingListItems();
      }

      closeModal();
    } catch (error) {
      console.error("Error adding item to shopping list:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 p-10 w-fit bg-opacity-100 z-auto"
      }
    >
      <div>
        <h2 className="bg-white px-3 py-1 rounded-full text-center">
          Add New Item
        </h2>
        <div className="form-group w-full">
          <label className="text-white">Item Name:</label>
          <input
            type="text"
            name="name"
            value={itemName}
            className="form-element p-2 rounded-md w-full"
            placeholder="Item name here"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            onClick={handleSubmit}
            className="px-2 py-1 bg-yellow-600 text-white mr-2 rounded-md hover:opacity-75"
          >
            Add Item
          </button>
          <button
            onClick={closeModal}
            className="px-2 py-1 bg-red-600 text-white mr-2 rounded-md hover:opacity-75"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MealModal;
