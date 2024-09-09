import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/admin/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("token", response.data.data.token);
      toast(`Login successful`);
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        toast.error(`Login failed: ${error.response.data.error}`);
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="hero">
      <div className="hero-content md:my-14 flex-col lg:flex-row-reverse">
        <div className="text-center hidden md:block lg:text-left">
          <h1 className="text-5xl font-bold">Login Admin!</h1>
          <p className="py-6">
            Start your journey with Bright Future IT by logging in today and
            unlocking access to our expert-led Flutter courses. Whether you’re
            ready to dive into a new lesson, continue your learning path, or
            take on a challenging project, it all begins here. Let’s build the
            future together!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <h2 className="text-center text-[28px] md:text-[32px] font-semibold">
              Please{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#884AFF] to-[#C54AFF]">
                Login
              </span>
            </h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="email"
                className="input input-sm md:input-md input-bordered focus:outline-none focus:ring-2 focus:ring-[#884AFF] focus:border-transparent transition-transform transform duration-300 ease-in-out hover:scale-105"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="password"
                className="input input-sm md:input-md input-bordered focus:outline-none focus:ring-2 focus:ring-[#884AFF] focus:border-transparent transition-transform transform duration-300 ease-in-out hover:scale-105"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control">
              <button
                type="submit"
                className="btn btn-primary btn-sm md:btn-md  text-white bg-gradient-to-r from-[#884AFF] to-[#C54AFF] hover:from-teal-400 hover:to-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
