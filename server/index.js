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

  const existingMessages = await Message.find().sort({ createdAt: -1 }).limit(50);
  socket.emit("previousMessages", existingMessages.reverse());

  socket.on("sendMessage", async ({ user, text }) => {
    try {
      const message = new Message({ user, text });
      await message.save();
      io.emit("receiveMessage", message);
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
