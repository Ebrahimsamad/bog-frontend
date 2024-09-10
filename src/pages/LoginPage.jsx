import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { FiLoader } from "react-icons/fi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const response = await login({ email, password });
      loginContext(response.data.token, response.data.user);
      navigate("/");
    } catch (error) {
      setError("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <div className="w-96 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl mb-4 text-yellow-500 font-bold">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full bg-gray-700 text-gray-100 border-none p-2 rounded-lg placeholder-gray-500"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full bg-gray-700 text-gray-100 border-none p-2 rounded-lg placeholder-gray-500"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex justify-center">
            {loading ? (
              <button
                type="button"
                className="w-full bg-yellow-500 text-gray-900 font-semibold p-3 rounded-lg flex items-center justify-center hover:bg-yellow-600 transition duration-300"
                disabled
              >
                <FiLoader className="animate-spin text-2xl" />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-yellow-500 text-gray-900 font-semibold p-3 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
