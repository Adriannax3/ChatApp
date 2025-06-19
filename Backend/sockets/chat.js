const Message = require("../models/Message");
const messageActions = require('../actions/api/messagesActions');
const userSockets = new Map();

module.exports = function handlePrivateChat(io) {
  io.on("connection", (socket) => {
    const { userId } = socket.handshake.query;

    if (!userId) {
      socket.disconnect();
      return;
    }

    userSockets.set(userId, socket);

    socket.on("sendMessage", async ({ toUserId, message }) => {
        
      try {
        const newMessage = await messageActions.saveMessage({fromUserId: userId, toUserId, message});

        const targetSocket = userSockets.get(toUserId);

        if (targetSocket) {
          targetSocket.emit("receiveMessage", {
            newMessage
          });
        }

        socket.emit("receiveMessage", {
          newMessage
        });
        } catch (err) {
          console.error("Błąd zapisu wiadomości do DB:", err);
          socket.emit("errorMessage", "Nie udało się wysłać wiadomości.");
      }
    });

    socket.on("disconnect", () => {
      userSockets.delete(userId);
    });
  });
};
