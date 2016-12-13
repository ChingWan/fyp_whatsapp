import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');
export const Messages = new Mongo.Collection('messages');
export const GroupChats = new Mongo.Collection('groupchats');
export const GroupMessages = new Mongo.Collection('groupmessages');