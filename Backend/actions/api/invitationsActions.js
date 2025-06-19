const mongoose = require('mongoose');
const Invitation = require('../../models/Invitation');
const User = require('../../models/User');


class invitationsActions {
  async sendInvite(req, res) {
    try {
    const userId = req.user?.id;
    const receiverId = req.body.receiverId;

    
    if(!userId || !receiverId) return res.status(400).json({message: "Brak wymaganych danych."});

    const sender = await User.findById(userId);
    if(!sender) return res.status(400).json({message: "Nie znaleziono sender."});
    const receiver = await User.findById(receiverId);
    if(!receiver) return res.status(400).json({message: "Nie znaleziono sender."});
    
    const newInvitation = new Invitation({
      sender,
      receiver,
      status: "pending"
    });

    await newInvitation.save();
    res.status(201).json({ message: "Zaproszenie wysłane!" });

    } catch (error) {
      res.status(500).json({
        message: 'Błąd podczas pobierania zaproszeń:',
        error
      });
    }
  }

  async getFriends(req, res) {
    const userId = req.user?.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Nieprawidłowe ID użytkownika.' });
    }

    try {
      const invitations = await Invitation.find({
        $and: [
          {
            $or: [
              { sender: userId },
              { receiver: userId }
            ]
          },
          { status: 'accepted' }
        ]
      })
      .populate('sender', 'username avatar')
      .populate('receiver', 'username avatar');

      const friends = invitations.map(inv => {
        if (inv.sender._id.toString() === userId.toString()) {
          return inv.receiver;
        } else {
          return inv.sender;
        }
      });
      res.status(200).json(friends);
    } catch (error) {
      res.status(500).json({
        message: 'Błąd podczas pobierania zaproszeń:',
        error
      });
    }
  }
  
  async getReceivedInvitations(req, res) {
    try {
      const userId = req.user?.id;
      const receiver = await User.findById(userId);
      if (!receiver) {
        return res.status(400).json({ message: "Nieprawidłowe ID użytkownika." });
      }
  
      const receivedInvitations = await Invitation.find({
        receiver: userId,
        status: "pending"
      }).populate("sender", "username avatar");
  
      res.status(200).json(receivedInvitations);
  
    } catch (error) {
      console.error("Błąd:", error);
      res.status(500).json({
        message: "Błąd podczas pobierania zaproszeń:",
        error
      });
    }
  }
  

  async acceptInvite(req, res) {
    try {
      const invitationId = req.params.invitationId;
      const invitation = await Invitation.findById(invitationId);
      if(!invitation) return res.status(400).json({message: "Nie ma takiego zaproszenia."});
      
      if (invitation.status !== "pending") {
        return res.status(400).json({ message: "To zaproszenie zostało już przetworzone." });
      }

      invitation.status = "accepted";
      await invitation.save();

      res.status(200).json({ message: "Zaproszenie zaakceptowane." });
      
    } catch (error) {
      res.status(500).json({
        message: 'Błąd podczas pobierania zaproszeń:',
        error
      });
    }
  }

  async rejectInvite(req, res) {
    try {
      const invitationId = req.params.invitationId;
      const invitation = await Invitation.findById(invitationId);
      if(!invitation) return res.status(400).json({message: "Nie ma takiego zaproszenia."});
      
      if (invitation.status !== "pending") {
        return res.status(400).json({ message: "To zaproszenie zostało już przetworzone." });
      }

      invitation.status = "rejected";
      await invitation.save();

      res.status(200).json({ message: "Zaproszenie zaakceptowane." });
      
    } catch (error) {
      res.status(500).json({
        message: 'Błąd podczas pobierania zaproszeń:',
        error
      });
    }
  }

}

module.exports = new invitationsActions();
