import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MealModal from "./AddMealModal";

const Plan = () => {
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
        ` Meal Plans
      </h1>
      <div className="mt-2">
        <button
          onClick={openModal}
          className="p-2 bg-yellow-600 text-white hover:opacity-75 transition-all rounded-md"
        >
          Add New Meal Plan
        </button>
      </div>
      <div className="mt-3">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>
      <MealModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Plan;
