import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function () {
  if (Meteor.users.find().count() != 0) return;

  Accounts.createUser({
    email: 'aaa@aaa',
    password: '23269808',
    profile: {
      name: 'My friend A'
    }
  });

  Accounts.createUser({
    email: 'bbb@bbb',
    password: '23269808',
    profile: {
      name: 'My friend B'
    }
  });

  Accounts.createUser({
    email: 'ccc@ccc',
    password: '23269808',
    profile: {
      name: 'My friend C'
    }
  });
});