import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store"; // adjust path if needed

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userdetails = useSelector((state) => state.userdetails);

  // 🔥 Redirect if not logged in
  useEffect(() => {
    if (!userdetails) {
      navigate("/login");
    }
  }, [userdetails, navigate]);

  // 🔥 Fetch user data safely
  useEffect(() => {
    async function fetchdata() {
      try {
        if (userdetails?.user?._id) {
          const res = await axios.get(
            `http://localhost:5000/api/user/getuser/${userdetails.user._id}`
          );
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchdata();
  }, [userdetails]);

  // 🔥 Logout function
  function handlelogout() {
    localStorage.removeItem("userdetails");
    localStorage.setItem("userlogin", false);
    dispatch(logout());
    navigate("/login");
  }

  function showfollower() {
    navigate("/follower");
  }

  function showfollowing() {
    navigate("/following");
  }

  // 🔥 IMPORTANT: stop render if no user
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      
      {/* Profile Card */}
      <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        
        <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl">
          
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src={userdetails?.user?.avatar}
              alt="avatar"
              className="w-28 h-28 rounded-full border-4 border-purple-500 object-cover 
              hover:scale-110 transition duration-300 ease-in-out shadow-lg"
            />
          </div>

          {/* User Info */}
          <h1 className="text-2xl font-bold text-white mt-4 hover:text-purple-400 transition duration-300">
            {userdetails?.user?.name}
          </h1>
          <p className="text-gray-400">{userdetails?.user?.email}</p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button
              onClick={showfollower}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg 
              hover:bg-purple-700 hover:scale-105 transition duration-300 shadow-md"
            >
              Followers
            </button>

            <button
              onClick={showfollowing}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
              hover:bg-indigo-700 hover:scale-105 transition duration-300 shadow-md"
            >
              Following
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handlelogout}
            className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg 
            hover:bg-red-600 hover:scale-105 transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}