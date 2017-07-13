angular.
module('messageList').
component('messageList', {
    templateUrl: 'https://staging-team.usace.army.mil/sites/sandbox/WW/MR/Custom Code/app_custom/messages/messages.template.html',
    controller: function MessagesController($http) {
        var messageItems = this;

        $http.get('https://staging-team.usace.army.mil/sites/sandbox/WW/MR/Custom Code/app_custom/messages/messages.js').then(function (response) {
            messageItems.messages = response.data;
          });
    }
});