import React, { useState } from "react";

const Create = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    cuisine: "",
    ingredients: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      setRecipeData({
        ...recipeData,
        image: files[0],
      });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setRecipeData({
        ...recipeData,
        [name]: value,
      });
    }
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = () => {
    const validationErrors = {};
    if (!recipeData.name) {
      validationErrors.name = "Recipe Name is required.";
    }
    if (!recipeData.cuisine) {
      validationErrors.cuisine = "Cuisine is required.";
    }
    if (!recipeData.ingredients) {
      validationErrors.ingredients = "Ingredients are required.";
    }
    if (!recipeData.image) {
      validationErrors.image = "Image is required.";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Proceed with submitting the recipe data
    }
  };

  return (
    <div>
      <h1 className="uppercase text-xl border-b-2 border-b-yellow-700 pb-2">
        ` Create New Recipe
      </h1>
      <div className="w-full flex items-center justify-center">
        <div>
          <div className="form-group">
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="enter recipe name"
              className="form-element px-3 py-2 w-72"
              onChange={handleInputChange}
            />
            {errors.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cuisine">Cuisine</label>
            <input
              type="text"
              name="cuisine"
              id="cuisine"
              placeholder="enter cuisine"
              className="form-element px-3 py-2 w-72"
              onChange={handleInputChange}
            />
            {errors.cuisine && (
              <div className="text-red-500 text-sm">{errors.cuisine}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              name="ingredients"
              id="ingredients"
              placeholder="enter ingredients"
              className="form-element px-3 py-2 w-72"
              onChange={handleInputChange}
            />
            {errors.ingredients && (
              <div className="text-red-500 text-sm">{errors.ingredients}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="image">Add Recipe Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="form-element px-3 py-2 w-72 bg-white"
              onChange={handleInputChange}
            />
            {errors.image && (
              <div className="text-red-500 text-sm">{errors.image}</div>
            )}
          </div>
        </div>
        <div className="p-5 bg-gray-500 h-80 w-72 flex items-center justify-center">
          <img
            src={imagePreview || "placeholder_image_url"}
            alt="Recipe Preview"
            className="aspect-square object-cover w-5/6"
          />
        </div>
      </div>
      <div className="form-group w-full flex items-center justify-center">
        <button
          onClick={handleSubmit}
          className="self-center px-3 py-1 bg-yellow-600 rounded text-white hover:opacity-75 transition-all"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );
};

export default Create;
