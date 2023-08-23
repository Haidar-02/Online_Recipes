import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { register } from "../../Helpers/auth.helpers";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessages(["Please fill in all fields."]);
      return;
    }
    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Registration successful ", response);
      navigate("/login");
    } catch (error) {
      console.log("Unexpected error during registration:", error);
    }
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-300 flex items-center justify-center">
      <div className="min-w-fit flex items-center justify-center h-4/6 rounded-lg">
        <div className="bg-yellow-600 p-5 h-full hover:scale-105 transition-all">
          <div className="form-group">
            <label htmlFor="name" className="lowercase text-sm text-white">
              ~ Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="p-2 form-element rounded-sm"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="lowercase text-sm text-white">
              ~ email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              className="p-2 form-element rounded-sm"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="lowercase text-sm text-white">
              ~ password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 form-element rounded-sm"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            {errorMessages.length > 0 && (
              <div className="text-red-500 text-sm px-3 p-1 text-center w-fit bg-white rounded-md">
                {errorMessages.map((message, index) => (
                  <div key={index}>{message}</div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <button
              onClick={handleSubmit}
              className="px-2 py-1 mt-3 hover:bg-gray-500 hover:text-white transition-all self-end rounded-sm cursor-pointer bg-white text-yellow-700 text-sm"
            >
              SignUp
            </button>
          </div>
        </div>
        <div className="h-full w-80 p-5 bg-image cursor-default hover:scale-105 transition-all">
          <h2 className="text-lg text-center p-3 bg-yellow-500 rounded-lg text-white tracking-wider">
            Fill the fields to register a new Account
          </h2>
          <div className="p-3 bg-white text-sm rounded-full text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-yellow-700 border-b-2 border-b-white cursor-pointer hover:border-b-2 hover:border-yellow-600 transition-all"
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
