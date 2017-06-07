/*Handling der Events, die an ein Element gebunden werden*/
Template.deleteMessageTool.events({
    /*Löscht eine Nachricht mit der übergebenen ID*/
    'click .message_delete_Icon': function(e, tmp){
        Meteor.call('deleteMessage', tmp.data.messageId, Meteor.userId());
    }
});