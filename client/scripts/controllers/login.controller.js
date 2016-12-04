import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { Controller } from 'angular-ecmascript/module-helpers';

export default class LoginCtrl extends Controller {
  login() {
    if (_.isEmpty(this.email)) return;

    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Email confirmation',
      template: '<div>' + this.email + '</div><div>Is your email correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'edit',
      cancelType: 'button-dark button-clear'
    });


    confirmPopup.then((res) => {
      if (!res) return;

      this.$ionicLoading.show({
        template: 'Loading...'
      });
      Meteor.loginWithPassword(this.email, this.password, (err) => {
        if (err) {
          this.$ionicLoading.hide();
          this.handleError(err);
        } else {
          this.$state.go('profile');
          this.$ionicLoading.hide();

        }
      });

     
    });
  }
  register() {
    if (_.isEmpty(this.email)) return;

    const confirmPopup = this.$ionicPopup.confirm({
      title: 'Email confirmation',
      template: '<div>' + this.email + '</div><div>Is your email correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'edit',
      cancelType: 'button-dark button-clear'
    });


    confirmPopup.then((res) => {
      if (!res) return;

      this.$ionicLoading.show({
        template: 'Loading...'
      });


      Accounts.createUser({email:this.email, password:this.password}, (err) => {
        if (err) {
          this.$ionicLoading.hide();
          this.handleError(err);
        } else {
          this.$state.go('profile');
          this.$ionicLoading.hide();

        }
      });
    });
  }
  handleError(err) {
    this.$log.error('Login error ', err);

    this.$ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}

LoginCtrl.$name = 'LoginCtrl';
LoginCtrl.$inject = ['$state', '$ionicLoading', '$ionicPopup', '$log'];