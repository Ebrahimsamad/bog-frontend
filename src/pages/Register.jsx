import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ username, email, password });
      navigate("/login");
    } catch (error) {
      setError("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <div className="w-96 bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl mb-4 text-yellow-500 font-bold">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border-none p-2 rounded-lg placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border-none p-2 rounded-lg placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border-none p-2 rounded-lg placeholder-gray-500"
              required
            />
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
                Sign Up
              </button>
            )}
          </div>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
