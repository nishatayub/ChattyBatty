const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config');
const Message = require('./chatModel');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Chat server is running!");
});

io.on('connection', async (socket) => {
  console.log("New WebSocket connection:", socket.id);

  // Join a chat room between two users
  socket.on("joinChat", async ({ currentUser, targetUser }) => {
    // Create a unique room ID for the two users (alphabetically sorted to ensure consistency)
    const roomId = [currentUser, targetUser].sort().join('_');
    socket.join(roomId);
    console.log(`${currentUser} joined room ${roomId} to chat with ${targetUser}`);
    
    // Send previous messages between these two users
    try {
      const existingMessages = await Message.find({
        $or: [
          { user: currentUser, targetUser: targetUser },
          { user: targetUser, targetUser: currentUser }
        ]
      }).sort({ createdAt: -1 }).limit(50);
      
      socket.emit("previousMessages", existingMessages.reverse());
      
      // Send a demo message from the target user after a short delay if no previous messages
      if (existingMessages.length === 0) {
        setTimeout(async () => {
          const welcomeMessage = new Message({
            user: targetUser,
            text: `Hey ${currentUser}! 👋 Thanks for connecting with me on ChattyBatty!`,
            targetUser: currentUser,
            timestamp: new Date().toISOString()
          });
          await welcomeMessage.save();
          io.to(roomId).emit("receiveMessage", welcomeMessage);
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  });

  socket.on("sendMessage", async ({ user, text, targetUser, timestamp }) => {
    try {
      const message = new Message({ 
        user, 
        text, 
        targetUser,
        timestamp: timestamp || new Date().toISOString()
      });
      await message.save();
      
      // Send to the specific room only
      const roomId = [user, targetUser].sort().join('_');
      io.to(roomId).emit("receiveMessage", message);
      
      console.log(`Message from ${user} to ${targetUser}: ${text}`);
      
      // Simulate a response from the target user after a delay
      setTimeout(async () => {
        const responses = [
          "That's interesting! 🤔",
          "I totally agree with you! 👍",
          "Thanks for sharing that! 😊",
          "Really? Tell me more about that!",
          "Haha, that's funny! 😄",
          "I see what you mean 💭",
          "That sounds great! ✨",
          "Absolutely! 💯",
          "I had a similar experience once!",
          "That's a good point! 🎯"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = new Message({
          user: targetUser,
          text: randomResponse,
          targetUser: user,
          timestamp: new Date().toISOString()
        });
        
        await responseMessage.save();
        io.to(roomId).emit("receiveMessage", responseMessage);
        
        console.log(`Auto-response from ${targetUser} to ${user}: ${randomResponse}`);
      }, Math.random() * 3000 + 1000); // Random delay between 1-4 seconds
      
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("typing", ({ user, targetUser }) => {
    const roomId = [user, targetUser].sort().join('_');
    socket.to(roomId).emit("userTyping", { user });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
