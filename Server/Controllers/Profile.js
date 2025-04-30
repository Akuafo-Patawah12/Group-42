const User = require('../Models/userSchema');
const Post = require('../Models/ProductsSchema');
const {Order} = require('../Models/OrderAndShipment');

// Controller to get user profile details
exports.getUserProfile = async (req, res) => {
    const {id}= req.params
  try {
    // Fetch user by their ID (assuming the user is authenticated and their ID is stored in req.user)
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Fetch all posts made by the user
    const posts = await Post.find({ user_id: id });
    
    // Fetch all orders made by the user
    const orders = await Order.find({ customer_id: id });

    // Fetch the total shipment orders count
    const totalShipments = orders.length;

    // Format user join date
    const joinDate = user.createdAt.toLocaleDateString();

    return res.status(200).json({
      username: user.username,
      initials: user.username.split(' ').map(word => word[0]).join(''),
      joinDate,
      posts,
      totalShipments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Controller to delete a post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
   console.log(postId,req.user.id)
    // Find and delete the post
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure the post belongs to the user making the request
    if (post.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    // Delete the post
     await Post.findByIdAndDelete(postId);

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
