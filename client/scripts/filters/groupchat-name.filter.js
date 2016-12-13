import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Filter } from 'angular-ecmascript/module-helpers';

export default class GroupChatNameFilter extends Filter {
  filter(groupchat) {
    if (!groupchat) return;

    let otherId = _.without(groupchat.userIds, Meteor.userId())[0];
    let otherUser = Meteor.users.findOne(otherId);
    let hasName = otherUser && otherUser.profile && otherUser.profile.name;

    return hasName ? otherUser.profile.name : groupchat.name || 'NO NAME';
  }
}

GroupChatNameFilter.$name = 'groupchatName';
