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
    console.log({body});
    
    let [chatroomId] = await db.check_chatroom_id([+otherId, +id]);
    console.log(chatroomId);
    if (!chatroomId) {
      let [newChatroomId] = await db.add_chatroom();
      await db.add_to_chatjunc([+id, +newChatroomId.id]);
      await db.add_to_chatjunc([+otherId, +newChatroomId.id]);
      await db.add_message([+newChatroomId.id, "message me!", +id]);
      socket.join(chatroomId);
      io.in(chatroomId).emit("login completed", {
        chatroomMessages: [],
        newChatroomId
      });
    } else {
      let chatroomMessages = await db.get_chatroom_messages(
        +chatroomId.chatroom_id
      );
      socket.join(+chatroomId.chatroom_id);
      io.in(+chatroomId.chatroom_id).emit("login completed", {
        chatroomMessages,
        chatroomId: +chatroomId.chatroom_id
      });
    }
  }
};
