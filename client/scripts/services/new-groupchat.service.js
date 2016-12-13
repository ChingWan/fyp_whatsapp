import { Service } from 'angular-ecmascript/module-helpers';

import newGroupChatTemplateUrl from '../../templates/new-groupchat.html';

export default class NewGroupChatService extends Service {
  constructor() {
    super(...arguments);

    this.templateUrl = newGroupChatTemplateUrl;
  }

  showModal() {
    this.scope = this.$rootScope.$new();

    this.$ionicModal.fromTemplateUrl(this.templateUrl, {
      scope: this.scope
    })
    .then((modal) => {
      this.modal = modal;
      this.modal.show();
    });
  }

  hideModal() {
    this.scope.$destroy();
    this.modal.remove();
  }
}

NewGroupChatService.$name = 'NewGroupChat';
NewGroupChatService.$inject = ['$rootScope', '$ionicModal'];