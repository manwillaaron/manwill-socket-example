module.exports = {
  async messageToServer(body, io, socket, db) {
    const { senderId, content, chatroomId, senderName } = body;
    let newMessage = await db.add_message([chatroomId, content, senderId, senderName]);
    io.in(chatroomId).emit("incoming", newMessage);
  },

  async joinRoom(body, io, socket, db) {
    const { chatroomId, chatroomMessages } = body;
    socket.join(chatroomId);
    io.in(chatroomId).emit("login completed", { chatroomMessages, chatroomId });
  },

  async checkForChatroom(socket, io, body, db) {
    const { otherId, id } = body;
    let chatroomId = await db.check_chatroom_id([+otherId, +id]);
    if (!chatroomId[0]) {
      let newChatroomId = await db.add_chatroom();
      await db.add_to_chatjunc([+id, +newChatroomId[0].id]);
      await db.add_to_chatjunc([+otherId, +newChatroomId[0].id]);
      await db.add_message([+newChatroomId[0].id, "message me!", +id]);
      socket.join(chatroomId);
      io.in(chatroomId).emit("login completed", {
        chatroomMessages: [],
        newChatroomId
      });
    } else {
      let chatroomMessages = await db.get_chatroom_messages(
        +chatroomId[0].chatroom_id
      );
      socket.join(+chatroomId[0].chatroom_id);
      io.in(+chatroomId[0].chatroom_id).emit("login completed", {
        chatroomMessages,
        chatroomId: +chatroomId[0].chatroom_id
      });
    }
  }
};
