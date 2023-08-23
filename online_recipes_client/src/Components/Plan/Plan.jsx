import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MealModal from "./AddMealModal";
import { getMealPlans } from "../../Helpers/recipes.helpers";

const Plan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealPlans, setMealPlans] = useState([]);
  const [formattedEvents, setFormattedEvents] = useState([]);
  async function fetchPlans() {
    try {
      const response = await getMealPlans();
      setMealPlans(response.mealPlans);
      console.log(response);
      setFormattedEvents(
        response.mealPlans.map((mealPlan) => ({
          title: mealPlan.meal_title,
          date: mealPlan.meal_date,
        }))
      );
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    }
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchMealPlans() {
      try {
        const response = await getMealPlans();
        setMealPlans(response.mealPlans);
        console.log(response);
        setFormattedEvents(
          response.mealPlans.map((mealPlan) => ({
            title: mealPlan.meal_title,
            date: mealPlan.meal_date,
          }))
        );
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    }
    fetchMealPlans();
  }, []);

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
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={formattedEvents}
        />
      </div>
      <MealModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchPlans={fetchPlans}
      />
    </div>
  );
};

export default Plan;
