const Message = require('../../models/Message');
const { connectDB, connection } = require("../../db/mongodb");

connectDB();

class messageActions {
    async saveMessage({ fromUserId, toUserId, message }) {
        const newMessage = new Message({ fromUserId, toUserId, message });
        return await newMessage.save();
    }

    async getMessages(req, res) {
        try {
            const { fromUserId, toUserId } = req.query;
            const messages = await Message.find({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            }).sort({ timestamp: 1 }); // rosnąco wg czasu
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({message: "Błąd podczas pobierania wiadomości: ", error})
        }
    }
}

module.exports = new messageActions();