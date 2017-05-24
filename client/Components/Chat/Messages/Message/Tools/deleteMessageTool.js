Template.deleteMessageTool.events({
    'click .message_delete_Icon': function(e, tmp){
        Meteor.call('deleteMessage', tmp.data.messageId, Meteor.userId());
    }
});