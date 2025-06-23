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
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
