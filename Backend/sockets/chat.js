const Message = require("../models/Message");
const messageActions = require('../actions/api/messagesActions');
const userSockets = new Map();

module.exports = function handlePrivateChat(io) {
  io.on("connection", (socket) => {
    const { userId } = socket.handshake.query;
    if (!userId) return socket.disconnect();
    userSockets.set(userId, socket);
    socket.data.activeWith = null;

    const markThread = async (peerUserId) => {
      const r = await Message.updateMany(
        { fromUserId: peerUserId, toUserId: userId, isRead: false },
        { $set: { isRead: true, readAt: new Date() } }
      );
      socket.emit("messagesMarkedRead", { peerUserId, updatedCount: r.modifiedCount ?? r.nModified ?? 0 });
      const ps = userSockets.get(peerUserId);
      if (ps) ps.emit("peerRead", { readerUserId: userId, threadWith: peerUserId });
    };

    socket.on("openThread", async ({ peerUserId }) => {
      try { socket.data.activeWith = peerUserId; await markThread(peerUserId); }
      catch { socket.emit("errorMessage", "Nie udało się oznaczyć wiadomości jako przeczytanych."); }
    });

    socket.on("markThreadRead", async ({ peerUserId }) => {
      try { await markThread(peerUserId); }
      catch { socket.emit("errorMessage", "Nie udało się oznaczyć wiadomości jako przeczytanych."); }
    });

    socket.on("sendMessage", async ({ toUserId, message }) => {
      try {
        const newMessage = await messageActions.saveMessage({ fromUserId: userId, toUserId, message });
        const t = userSockets.get(toUserId);
        if (t && t.data.activeWith === userId) {
          await Message.updateOne({ _id: newMessage._id }, { $set: { isRead: true, readAt: new Date() } }).catch(() => {});
          t.emit("messageRead", { messageId: newMessage._id });
          socket.emit("messageRead", { messageId: newMessage._id });
        }
        if (t) t.emit("receiveMessage", { newMessage });
        socket.emit("receiveMessage", { newMessage });
      } catch {
        socket.emit("errorMessage", "Nie udało się wysłać wiadomości.");
      }
    });

    socket.on("disconnect", () => userSockets.delete(userId));
  });
};
