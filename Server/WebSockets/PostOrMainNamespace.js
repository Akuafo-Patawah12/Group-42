
const Post=require("../Models/PostSchema")
const User=require("../Models/userSchema")
const notification=require("../Models/Notification")

const PostFunction=(Socket,users,io,notificationsNamespace)=>{
     //asigning the users id to the socket id and inserting into the users object
    console.log(users)
    
    console.log("Connected to server")

 Socket.on("refreshPost",async(data)=>{
  console.log(data)
  try {
    const result = await Post.aggregate([  //joining an querying different tables
      { 
        $lookup: {
          from: 'users', // Name of the user collection
          localField: 'user_id', // Field in the posts collection
          foreignField: '_id', // Field in the users collection
          as: 'userDetails' // Alias for the joined documents
         }
      },
      {
        $unwind: '$userDetails' // Deconstruct the array of userDetails
      },
      
    
      {
        $project: {
          _id: 1, // Include the _id of the post
          user_id: 1, // Include the user_id
          caption: 1, // Include the caption
          img_vid: 1, // Include the img_vid,
          price:1,
          website_url: 1, // Include the website_url
          category:1,
          createdAt: 1, //Include the createdAt
          username: '$userDetails.username', // Include the username from userDetails
          email:  '$userDetails.email'
        }
      }
    ]).sort({createdAt:-1});
    Socket.emit("getPost",result)
  } catch (error) { 
    console.error('Error fetching posts:', error);
   
  } 
 }) 

 Socket.on("getPost", async (postId) => {
  console.log(postId)
  try {
    const post = await Post.findById(postId).populate("user_id","email username createdAt"); // Fetch post by ID
    if (post) {
      Socket.emit("postData", post); // Emit the post data back to the client
    } else {
      Socket.emit("postData", { error: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    Socket.emit("postData", { error: "An error occurred while fetching the post" });
  }
});


Socket.on("getProductsByCategory", async (category) => {
  try {
    const products = await Post.find({ category: category }); // Query products by category
    if (products.length > 0) {
      Socket.emit("categoryProducts", products); // Emit the products to the client
    } else {
      Socket.emit("categoryProducts", { error: "No products found in this category" });
    }
  } catch (error) {
    console.error(error);
    Socket.emit("categoryProducts", { error: "An error occurred while fetching products" });
  }
});
 
 Socket.on('sendPost', async (data) => { //socket.on means receiving data or information from client side
   const { id,caption,img_vid,website_url,category,isPremium,price } = data; //get post from client side
   try {
     // Create a new post and save it to the database
     const input = new Post({
       caption,
       img_vid,
       user_id:id,
       category,
       website_url,
       premium: isPremium,
       price
     });
     await input.save(); //insert post into database 
     const post = await Post.findOne({ _id: input._id }).populate('user_id','username').lean();/* getting post from
     post collection and using the user id in the post collection to get the username from the users collection */
     const data={
         _id: post._id,
         user_id: post.user_id._id,
         caption,
         img_vid,
         category,
         price,
         createdAt: post.createdAt,
         username: post.user_id.username
     }
       io.emit('receivePost', data);
       const notificationData = {
        _id: post._id,
        message: `${post.user_id.username} created a post.`
    };
    notificationsNamespace.emit('notify', notificationData);
    const customers = await User.find({account_type:"Personal"}); // Fetch user by ID
    customers.forEach(async(customer) => {
      try{
      const socketId = users[customer._id]; // Fetch user’s socket ID
      if (socketId) {
        if(customer._id.toString() === post.user_id._id.toString()){
          // Emit the notification to the specific user
          const notification1 = new notification({
            userId: customer._id,
            message: `You uploaded a product.`,
          });
          await notification1.save();
          notificationsNamespace.to(socketId).emit("notify", notification1);
        }else{
        const notification2 = new notification({
          userId: customer._id,
          message: `${post.user_id.username} added a product.`,
        });
        await notification2.save();
        notificationsNamespace.to(socketId).emit("notify", notification2);
      }
    }
  }catch(err){
      console.log(err)
    }
    })
   } catch (err) {
     console.log(err, "sock error");
   }
 });

 Socket.on("disconnect", () => {
  console.log("Disconnected from the post namespace");
  // Optionally, you can remove the user from the users object if needed
  // delete users[Socket.id];
  for (const [userId, socketId] of Object.entries(users)) {
    if (socketId === Socket.id) {
        delete users[userId];
        break;
    }
  }
})

 return Socket
}

module.exports= PostFunction