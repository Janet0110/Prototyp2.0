/*Handling der Events, die an ein Element gebunden werden*/
Template.addUserDialog.events({
    /*schließt das Dialogfenster*/
    'click .close': function(e, tmpl){
        hideDialog();
    },
    /*Form-Submit um einen Benutzer zum Channel hinzuzufügen*/
    'click .submit': function(e, tmpl){
        var userName = $('.inputValue').val();
        Meteor.call('addUserToChannelRole', Rol.MEMBER, currentTeamId(), null, userName, currentChannel().name ,function(err){
            if(err){
                Materialize.toast(err, 4000, "error");
            }else{
                Materialize.toast("User added", 4000, "success");
            }
        });
        hideDialog();
    }
});

/*Funktion für das Schließen des Dialogs*/
var hideDialog = function(){
    var parentView = Blaze.currentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.dialogAddUser.set(false);
};