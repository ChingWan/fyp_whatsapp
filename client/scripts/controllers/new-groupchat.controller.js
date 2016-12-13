import { Meteor } from 'meteor/meteor';
import { Controller } from 'angular-ecmascript/module-helpers';
import { GroupChats } from '../../../lib/collections';

export default class NewGroupChatCtrl extends Controller {
  constructor() {
    super(...arguments);

    this.subscribe('users');

    this.helpers({
      users() {
        return Meteor.users.find({ _id: { $ne: this.currentUserId } });
      }
    });
  }



  newGroupChat() {
    var checkboxes = document.getElementsByName('selected');
    var userId = [this.currentUserId];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {

        userId.push(checkboxes[i].value);
      }
    }
    console.log(userId);
    this.callMethod('newGroupChat', userId, (err, groupchatId) => {
      this.hideNewGroupChatModal();
      if (err) return this.handleError(err);

    });
  }

  hideNewGroupChatModal() {
    this.NewGroupChat.hideModal();
  }

  goToGroupChat(groupchatId) {
    this.$state.go('tab.groupchat', { groupchatId });
  }

  handleError(err) {
    this.$log.error('New groupchat creation error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'New Groupchat creation failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

NewGroupChatCtrl.$name = 'NewGroupChatCtrl';
NewGroupChatCtrl.$inject = ['$state', 'NewGroupChat', '$ionicPopup', '$log'];