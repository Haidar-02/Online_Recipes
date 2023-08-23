import React from "react";
import Modal from "react-modal";
import sampleImage from "../../../Assets/HomePage/right.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";

const RecipeModal = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div className="flex-col items-center justify-center">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg text-white p-2 bg-yellow-600">
            Recipe Details
          </h2>
          <button
            onClick={closeModal}
            className="px-3 py-1 rounded-full mr-2 bg-red-500 text-white hover:opacity-75 transition-all"
          >
            Close
          </button>
        </div>

        <div className="flex">
          <div>
            <img
              src={sampleImage}
              alt=""
              className="aspect-square w-[700px] object-cover rounded-sm"
            />
          </div>

          <div className="w-full px-5 ml-10 cursor-default">
            <h2 className="text-2xl tracking-wider">Title</h2>
            <p>
              By <strong> Name</strong>
            </p>
            <div className="mt-2">
              <p className="text-lg text-yellow-600">Ingredients</p>
              <p>Ingredients Here</p>
            </div>
            <div className="mt-2">
              <p className="text-lg text-yellow-600">Cuisine</p>
              <p>Cuisine Here</p>
            </div>
            <div className="flex items-end justify-start gap-2">
              <FavoriteIcon className="mt-5 text-gray-500 cursor-pointer hover:text-red-500 transition-all" />
              <div>
                Liked By <strong className="text-red-500">10 people</strong>
              </div>
            </div>
            <div className="border-2 border-gray-800 mt-3 p-2 rounded-md h-36 overflow-auto">
              <p className="border-b-2 border-b-yellow-600">Comments</p>
              <p className="mt-2 font-bold">
                User : <span className="font-normal">Comment Content Here</span>
              </p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Add comment"
                className="text-sm p-2 ps-10 rounded-md w-full mt-2 border-2 outline-none border-gray-500 focus:border-yellow-600 transition-all"
              />
              <CommentIcon className="text-gray-500 absolute top-4 left-2" />
              <SendIcon className="text-gray-500 absolute top-4 right-2 hover:text-yellow-500 transition-all cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RecipeModal;
