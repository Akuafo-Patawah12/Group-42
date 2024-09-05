
const Post=require("../DatabaseSchemas/PostSchema")
const PostFunction=(Socket,users,io,notificationsNamespace)=>{
    const userId=Socket.user.id  // Extracting users id from socket
    users[userId]=Socket.id  //asigning the users id to the socket id and inserting into the users object
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
          img_vid: 1, // Include the img_vid
          createdAt: 1, //Include the createdAt
          username: '$userDetails.username' // Include the username from userDetails
        }
      }
    ]).sort({createdAt:-1});
    Socket.emit("getPost",result)
  } catch (error) { 
    console.error('Error fetching posts:', error);
   
  } 
 })   
 Socket.on('sendPost', async (data) => { //socket.on means receiving data or information from client side
   const { id,caption,img_vid } = data; //get post from client side
   try {
     // Create a new post and save it to the database
     const input = new Post({
       caption,
       img_vid,
       user_id:id
     });
     await input.save(); //insert post into database 
     const post = await Post.findOne({ _id: input._id }).populate('user_id','username').lean();/* getting post from
     post collection and using the user id in the post collection to get the username from the users collection */
     const data={
         _id: post._id,
         user_id: post.user_id._id,
         caption,
         img_vid,
         createdAt: post.createdAt,
         username: post.user_id.username
     }
       io.emit('receivePost', data);
       const notificationData = {
        _id: post._id,
        message: `${post.user_id.username} created a post.`
    };
    notificationsNamespace.emit('notify', notificationData);


   } catch (err) {
     console.log(err, "sock error");
   }
 });
 return Socket
}

module.exports= PostFunction