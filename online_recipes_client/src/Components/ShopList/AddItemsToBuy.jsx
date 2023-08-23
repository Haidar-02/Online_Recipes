import React, { useState } from "react";
import Modal from "react-modal";

const MealModal = ({ isOpen, closeModal }) => {
  const [itemName, setItemName] = useState("");

  const handleSubmit = () => {
    // Validate and process the meal data
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={
        "absolute top-0 left-1/2 -translate-x-1/2 bg-gray-500 p-10 w-fit bg-opacity-100 z-auto"
      }
    >
      <div>
        <h2 className="bg-white px-3 py-1 rounded-full text-center">
          Add New Item
        </h2>
        <div className="form-group">
          <label className="text-white">Item Name:</label>
          <input
            type="text"
            name="name"
            value={itemName}
            className="form-element w-full p-2"
            placeholder="Item name here"
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
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
