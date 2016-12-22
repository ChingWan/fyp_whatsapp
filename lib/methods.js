import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chats, Messages ,GroupChats,GroupMessages} from '../lib/collections';

Meteor.methods({
  newMessage(message) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message, Match.OneOf(
      {
        text: String,
        type: String,
        chatId: String
      },
      {
        picture: String,
        type: String,
        chatId: String
      }
    ));

    message.timestamp = new Date();
    message.userId = this.userId;

    const messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
    newGroupMessage(groupmessage) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(groupmessage, Match.OneOf(
      {
        text: String,
        type: String,
        groupchatId: String,
        userName:String
      },
      {
        picture: String,
        type: String,
        groupchatId: String,
        userName:String
      }
    ));

    groupmessage.timestamp = new Date();
    groupmessage.userId = this.userId;
    const groupmessageId = GroupMessages.insert(groupmessage);
    GroupChats.update(groupmessage.groupchatId, { $set: { lastGroupMessage: groupmessage } });

    return groupmessageId;
  },
    updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }

    check(name, String);

    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide a user name');
    }

    Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
    GroupMessages.update({}, { $set: { userName: name } });
  },
    updateGroupName(groupname, groupchatId) {
      if (!groupchatId) {
        throw new Meteor.Error('not-logged-in',
          'Must be logged in to update his name.');
      }
      check(groupname, String);
      if (groupname.length === 0) {
        throw Meteor.Error('name-required', 'Must provide a Group name');
      }

      GroupChats.update({ _id: groupchatId }, { $set: { groupName: groupname } });
    },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(otherId, String);
    const otherUser = Meteor.users.findOne(otherId);

    if (!otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    const chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    const chatId = Chats.insert(chat);

    return chatId;
  },
  newGroupChat(otherId) {
    const groupchat = {
      userIds: otherId,
      createdAt: new Date()
    };

    const groupchatId = GroupChats.insert(groupchat);

    return groupchatId;
  },
  invite(userId) {


  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to remove a chat.');
    }

    check(chatId, String);

    const chat = Chats.findOne(chatId);

    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },
    removeGroupChat(groupchatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to remove a groupchat.');
    }

    check(groupchatId, String);

    const groupchat = GroupChats.findOne(groupchatId);

    if (!groupchat || !_.include(groupchat.userIds, this.userId)) {
      throw new Meteor.Error('groupchat-not-exists',
        'GroupChat not exists');
    }

    GroupMessages.remove({ groupchatId: groupchatId });

    return GroupChats.remove({ _id: groupchatId });
  },
  updateGroupPicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }

    check(data, String);

      GroupChats.update({ _id: groupchatId }, { $set: { groupPicture: data } });
  }
});