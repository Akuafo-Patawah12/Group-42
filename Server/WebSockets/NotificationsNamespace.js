const Notification = require("../DatabaseSchemas/SupplyChain_Model/Notification")
const Notify=(socket)=>{

socket.on("sendMessage",async(data)=>{
    try{
       console.log(data)
       socket.to().emit("receivedMessage",data)
    }catch(error){
        console.log(error)
    }
})

socket.on('getUnreadNotifications', async (userId) => {
    try {
      const unread = await Notification.find({ userId, read: false }).sort({ createdAt: -1 });
      socket.emit('unreadNotifications', unread); // Send back to the same user
    } catch (error) {
      console.error('Error fetching notifications:', error);
      socket.emit('notificationError', 'Could not fetch notifications');
    }
  });

  // Emit event to mark notifications as read and return latest 10
socket.on("markNotificationsRead", async ({userId}) => {
    console.log(userId)
    try {
      await Notification.updateMany({ userId, read: false }, { $set: { read: true } });
  
      const latestNotifications = await Notification.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10);
  
      socket.emit("notificationList", latestNotifications);
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  });
  

socket.on("disconnect",()=>{
    console.log("user disconnected from Message namespace")
})

return socket
}


module.exports= Notify

