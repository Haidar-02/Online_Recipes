import React, { useState } from "react";
import Modal from "react-modal";

const MealModal = ({ isOpen, closeModal }) => {
  const [mealName, setMealName] = useState("");
  const [mealDate, setMealDate] = useState("");

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
          Add New Meal
        </h2>
        <div className="form-group">
          <label className="text-white">Meal Name:</label>
          <input
            type="text"
            name="name"
            value={mealName}
            className="form-element w-full p-2"
            placeholder="Meal name here"
            onChange={(e) => setMealName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-white">Meal Date:</label>
          <input
            type="date"
            value={mealDate}
            name="date"
            className="form-element w-full p-2"
            onChange={(e) => setMealDate(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="px-2 py-1 bg-yellow-600 text-white mr-2 rounded-md hover:opacity-75"
          >
            Add Meal
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
