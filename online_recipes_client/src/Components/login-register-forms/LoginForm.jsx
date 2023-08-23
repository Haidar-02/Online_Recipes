import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Helpers/auth.helpers";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    if (!formData.email || !formData.password) {
      setErrorMessages(["Please fill in all fields."]);
      return;
    }
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful");
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log("Unexpected error during registration:", error);
      setErrorMessages(["Incorrect email or password"]);
    }
  };
  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-300 flex items-center justify-center">
      <div className="min-w-fit flex items-center justify-center h-4/6 rounded-lg">
        <div className="bg-yellow-600 p-5 h-full hover:scale-105 transition-all w-full">
          <h2 className="text-white text-center text-lg">
            Sign In To Your Account
          </h2>
          <div className="form-group">
            <label htmlFor="name" className="lowercase text-sm text-white">
              ~ email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Your Email"
              className="p-2 form-element rounded-sm w-full"
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
              className="p-2 form-element rounded-sm w-full"
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex items-center justify-center">
            {errorMessages.length > 0 && (
              <div className="text-red-500 text-sm p-1 px-3 text-center w-fit bg-white rounded-md">
                {errorMessages.map((message, index) => (
                  <div key={index}>{message}</div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <button
              onClick={handleSubmit}
              className="px-2 py-1 w-32 mb-7 hover:bg-gray-500 hover:text-white transition-all self-end rounded-sm cursor-pointer bg-white text-yellow-700 text-sm"
            >
              SignIn
            </button>
          </div>
          <div>
            <div className="p-3 bg-white text-sm rounded-full text-center">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-yellow-700 border-b-2 border-b-white cursor-pointer hover:border-b-2 hover:border-yellow-600 transition-all"
              >
                Register Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
