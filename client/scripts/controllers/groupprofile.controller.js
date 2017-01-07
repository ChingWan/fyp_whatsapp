import { _ } from 'meteor/underscore';
import { MeteorCameraUI } from 'meteor/okland:camera-ui';
import { Controller } from 'angular-ecmascript/module-helpers';
import { GroupChats } from '../../../lib/collections';

export default class GroupProfileCtrl extends Controller {
  constructor() {
    super(...arguments);
    this.groupchatId = this.$state.params.groupchatId;
  this.helpers({ 
    
             
    });
  }

  updateGroupPicture () {
    MeteorCameraUI.getPicture({ width: 60, height: 60 }, (err, data) => {
      if (err) return this.handleError(err);

      this.$ionicLoading.show({
        template: 'Updating picture...'
      });

      this.callMethod('updateGroupPicture', data, (err) => {
        this.$ionicLoading.hide();
        this.handleError(err);
      });
    });
  }

  updateGroupName() {
    if (_.isEmpty(this.groupname)) return;
    this.callMethod('updateGroupName', this.groupname,this.groupchatId, (err) => {
      if (err) return this.handleError(err);
      this.$state.go('tab.groupchats');
    });
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

GroupProfileCtrl.$name = 'GroupProfileCtrl';
GroupProfileCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];
