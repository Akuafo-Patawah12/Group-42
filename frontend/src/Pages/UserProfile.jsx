import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Spin, message ,Modal} from "antd";
import { Link } from "lucide-react";
import axios from "axios";
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
        message.error("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchData();
  }, [accesstoken]);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      });
      setPosts((prev) => prev.filter((post) => post._id !== postId));
      message.success("Post deleted successfully");
    } catch (err) {
      console.error(err);
      message.error("Failed to delete post");
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
    <div style={{ paddingTop: "100px" }}
   className="layout-shift w-full min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 lg:w-[80%] px-6 py-10 mx-auto">
      <div className="flex items-center p-3 rounded-xl shadow-2xl bg-white gap-4 mb-6">
        <Avatar size={64} className="bg-purple-600 text-white">
          {user?.username?.slice(0, 2).toUpperCase()}
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-500 text-sm">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
          <p className="text-gray-600 text-sm">Total Posts: {posts.length} | Total Shipments: {orders}</p>
        </div>
      </div>

      <Divider orientation="left">User Posts</Divider>
      <div className=" w-full shadow-md py-5  rounded-lg bg-white columns-1 grid-gap-2 md:columns-2 lg:columns-3 space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            style={{marginBottom:"10px"}}
            className="relative w-full  border-2 border-purple-500 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden break-inside-avoid md:w-[270px]"
          >
          <div className="min-h-[200px]">
          {post.img_vid && (
              <img
                src={post.img_vid}
                alt="Post"
                className="w-full h-auto  rounded mt-2"
              />
            )}
            </div>
            <div className="p-2">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded-full">#{post.category}</span>
            <h4 className="mt-2 text-sm font-medium text-gray-800">{post.caption}</h4>
            <p className="text-xs text-gray-500">Condition: {post.product_condition}</p>
            {post.website_url && (
              <a href={post.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                <Link size={14} /> Link
              </a>
            )}
            <p className="mt-2 font-bold text-purple-700">₵{post.price}</p>
            <Button 
              danger
              size="small"
              onClick={() => {
                Modal.confirm({
                  title: 'Are you sure you want to delete this post?',
                  content: 'This action cannot be undone.',
                  okText: 'Yes, Delete',
                  okType: 'danger',
                  cancelText: 'Cancel',
                  onOk() {
                    handleDeletePost(post._id);
                  },
                });
              }}
              className="mt-2">
              Delete Post
            </Button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
