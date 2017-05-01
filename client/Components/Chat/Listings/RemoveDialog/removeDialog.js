
Template.removeDialog.events({
    'click .close': function(e, tmpl){
        hideDialog();
    },

    'click .submit': function(e, tmpl){
        var channelId = currentChannelId();
        Meteor.call('deleteChannel', channelId, User.id(),function(err){
            if(err){
                Materialize.toast(err, 4000, "error");
            }else{
                Materialize.toast("Channel deleted", 4000, "success");
                FlowRouter.go(history.back());
            }
        });
        hideDialog();
    }
});

var hideDialog = function(){
    var parentView = Blaze.currentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.dialog.set(false);
};