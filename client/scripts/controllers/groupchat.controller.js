import Ionic from 'ionic-scripts';
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';
import { GroupChats, GroupMessages } from '../../../lib/collections';

export default class GroupChatCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.groupchatId = this.$stateParams.groupchatId;
    this.isIOS = Ionic.Platform.isWebView() && Ionic.Platform.isIOS();
    this.isCordova = Meteor.isCordova;

    this.helpers({
      groupmessages() {
        return GroupMessages.find({ groupchatId: this.groupchatId });
      },
      data() {
        return GroupChats.findOne(this.groupchatId);
      }
    });


    this.autoScroll();
  }

  sendPicture() {
    let User = Meteor.users.findOne(this.currentUserId);
    MeteorCameraUI.getPicture({}, (err, data) => {
      if (err) return this.handleError(err);

      this.callMethod('newGroupMessage', {
        picture: data,
        type: 'picture',
        groupchatId: this.groupchatId,
        userName: User.profile.name
      });
    });
  }

  sendGroupMessage() {
    let User = Meteor.users.findOne(this.currentUserId);
    if (_.isEmpty(this.groupmessage)) return;
    this.callMethod('newGroupMessage', {
      text: this.groupmessage,
      type: 'text',
      groupchatId: this.groupchatId,
      userName: User.profile.name
    });

    delete this.groupmessage;
  }

  inputUp () {
    if (this.isIOS) {
      this.keyboardHeight = 216;
    }

    this.scrollBottom(true);
  }

  inputDown () {
    if (this.isIOS) {
      this.keyboardHeight = 0;
    }

    this.$ionicScrollDelegate.$getByHandle('groupchatScroll').resize();
  }

  closeKeyboard () {
    if (this.isCordova) {
      cordova.plugins.Keyboard.close();
    }
  }

  autoScroll() {
    let recentGroupMessagesNum = this.groupmessages.length;

    this.autorun(() => {
      const currGroupMessagesNum = this.getCollectionReactively('groupmessages').length;
      const animate = recentGroupMessagesNum != currGroupMessagesNum;
      recentGroupMessagesNum = currGroupMessagesNum;
      this.scrollBottom(animate);
    });
  }

  scrollBottom(animate) {
    this.$timeout(() => {
      this.$ionicScrollDelegate.$getByHandle('groupchatScroll').scrollBottom(animate);
    }, 300);
  }

  handleError(err) {
    if (err.error == 'cancel') return;
    this.$log.error('Profile save error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

GroupChatCtrl.$name = 'GroupChatCtrl';
GroupChatCtrl.$inject = ['$stateParams', '$timeout', '$ionicScrollDelegate', '$ionicPopup', '$log'];
