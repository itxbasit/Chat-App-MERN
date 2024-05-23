// Import necessary modules
import { createServer } from "http";
import { Server } from "socket.io";

// Create HTTP server and attach Socket.io
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// Initialize users array
let users = [];

// Function to add a new user
const addUser = (userId, socketId) => {
  // Check if user already exists in the array
  if (!users.some((user) => user.userId === userId)) {
    // Add user to the array
    users.push({ userId, socketId });
    console.log(users);
  }
};

// Function to remove a user
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Function to get a user by ID
const getUser = (userId) => {
  return users.find((user) => user.userId == userId);
};

// Event handler for new socket connections
io.on("connection", (socket) => {
  console.log("a user connected.");

  // Event handler for adding a user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // Send the user list to the newly connected user
    io.to(socket.id).emit("getUsers", users);
  });

  socket.on("sendNotification", ({ userId, notification }) => {
    const user = getUser(userId);
    io.to(user?.socketId).emit("receiveNotification", notification);
  });

  // Event handler for sending a message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(text);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Event handler for socket disconnections
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Start the HTTP server
httpServer.listen(8900, () => {
  console.log("Socket server is running on port 8900");
});

// Export necessary functions
export { addUser, removeUser, getUser };
