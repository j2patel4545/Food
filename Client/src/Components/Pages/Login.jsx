


import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Food from "../../Context/Fcontext";


function AdminLogin() {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const { setCola } = useContext(Food);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8799/user/login", {
        email,
        mobileNumber,
      });
        console.log(response.data.student);
        
      if (response.data.student) {
        setCola(response.data.student);
        localStorage.setItem("user", JSON.stringify(response.data.student));
        alert("Login successful!");
        navigate("/das");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
   
    <div className="flex w-screen h-screen justify-center items-center">
         <div className="flex flex-col rounded-2xl shadow-2xl gap-2 justify-center items-center h-[90%] w-[95%] bg-gradient-to-r from-[#CB202D] to-[#EC0C92]">
      <form onSubmit={handleLogin} className="flex flex-col gap-10 justify-center">
        <input
          className="flex h-14 w-86 bg-amber-50 rounded-md px-3 text-2xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          className="flex h-14 w-86 bg-amber-50 rounded-md px-3 text-2xl"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Mobile Number"
          type="text"
          required
        />
        <button type="submit" className="flex bg-black text-white h-14 w-86 rounded-md justify-center text-2xl items-center">
          Login
        </button>
      </form>
      <h3 className="flex gap-1 text-white">
        Don't have an account? <Link to="/reg" className="underline">Register</Link>
      </h3>
    </div>
    </div>
  );
}

export default AdminLogin;

