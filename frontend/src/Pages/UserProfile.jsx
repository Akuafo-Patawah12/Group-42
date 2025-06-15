import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Modal ,Spin} from "antd";
import { Link as LinkIcon } from "lucide-react";
import {toast} from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from 'jwt-decode';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accesstoken = localStorage.getItem("accesstoken");
  const decode = jwtDecode(accesstoken);
  

  axios.defaults.withCredentials=true
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch profile data from the backend
        const userRes = await axios.get(`http://localhost:4000/profile/${decode.id}`);

        setUser(userRes.data);
        setPosts(userRes.data.posts); // Posts returned from backend
        setOrders(userRes.data.totalShipments); // Orders count from backend
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchData();
  }, [accesstoken,decode.id]);
  // Set axios to send cookies with requests


  axios.defaults.withCredentials=true
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
  style={{ paddingTop: "100px" }}
  className="layout-shift w-full min-h-screen bg-stone-100 lg:w-[80%] px-6 py-10 mx-auto"
>
  {/* User Profile Header */}
  <div className="flex items-center p-5 rounded-2xl shadow-2xl bg-gradient-to-r from-white via-stone-50 to-white gap-6 mb-8">
    <Avatar size={72} className="bg-gradient-to-br from-purple-600 to-indigo-500 text-white font-bold">
      {user?.username?.slice(0, 2).toUpperCase()}
    </Avatar>
    <div>
      <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
      <p className="text-gray-500 text-sm mt-1">
        Joined: {new Date(user.joinDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 text-sm">
        Total Posts: {posts.length} | Total Shipments: {orders}
      </p>
    </div>
  </div>

  {/* Posts Section */}
  <Divider orientation="left" className="text-lg font-semibold text-purple-600">
    User Posts
  </Divider>

  {/* Masonry Grid */}
  <div className="w-full py-5 px-4 rounded-xl bg-white columns-1 md:columns-2 lg:columns-3 space-y-6">
    {posts.map((post) => (
      <motion.div
        key={post._id}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{marginBottom:"25px"}}
        className="relative w-full border border-purple-200 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden break-inside-avoid mb-6"
      >
        {/* Image */}
        <div className="min-h-[200px]">
          {post.img_vid && (
            <img
              src={post.img_vid}
              alt="Post"
              className="w-full h-auto object-cover rounded-t-2xl"
            />
          )}
        </div>

        {/* Post Info */}
        <div className="p-4 space-y-3">
          {/* Category Tag */}
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs font-bold uppercase rounded-full">
              #{post.category}
            </span>
          </div>

          {/* Caption */}
          <h4 className="text-base font-semibold text-gray-800 truncate">{post.caption}</h4>

          {/* Condition */}
          <p className="text-sm text-gray-500">
            Condition: <span className="font-semibold text-gray-700">{post.product_condition}</span>
          </p>

          {/* Website Link */}
          {post.website_url && (
            <a
              href={post.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-purple-600 hover:underline gap-1"
            >
              <LinkIcon size={14} /> Visit Link
            </a>
          )}

          {/* Price */}
          <p className="text-lg font-bold text-purple-700">₵{post.price}</p>

          {/* Delete Button */}
          <Button
  danger
  size="small"
  className="w-full mt-2"
  onClick={() => {
    const confirmed = window.confirm("Are you sure you want to delete this post? This action cannot be undone.");
    if (confirmed) {
      handleDeletePost(post._id);
    }
  }}
>
  Delete Post
</Button>

        </div>
      </motion.div>
    ))}
  </div>
</div>
  );
};

export default UserProfile;
