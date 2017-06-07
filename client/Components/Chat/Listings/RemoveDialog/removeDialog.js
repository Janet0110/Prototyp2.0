/*Handling der Events, die an ein Element gebunden werden*/
Template.removeDialog.events({
    /*Schließt das Dialogfenster*/
    'click .close': function(e, tmpl){
        hideDialog();
    },
/*Form-Submit für das Löschen eines Channels*/
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
/*Schließt Dialogfenster*/
var hideDialog = function(){
    var parentView = Blaze.currentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.dialog.set(false);
};