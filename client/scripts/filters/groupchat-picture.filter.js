import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class GroupChatPictureFilter extends Filter {
  filter(groupchat) {
    if (!groupchat) return;

    let otherId = _.without(groupchat.userIds, Meteor.userId())[0];
    let otherUser = Meteor.users.findOne(otherId);
    let hasPicture = otherUser && otherUser.profile && otherUser.profile.picture;

    return hasPicture ? otherUser.profile.picture : groupchat.picture || '/user-default.svg';
  };
}

GroupChatPictureFilter.$name = 'groupchatPicture';