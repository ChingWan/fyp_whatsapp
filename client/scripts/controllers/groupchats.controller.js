import { Controller } from 'angular-ecmascript/module-helpers';
import { GroupChats } from '../../../lib/collections';

export default class GroupChatsCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.helpers({
      data() {
        return GroupChats.find();
      }
    });
  }
  showNewGroupChatModal() {
    this.NewGroupChat.showModal();
  }
  remove(groupchat) {
    this.callMethod('removeGroupChat', groupchat._id,this.currentUserId);
  }
}

GroupChatsCtrl.$name = 'GroupChatsCtrl';
GroupChatsCtrl.$inject = ['NewGroupChat'];
