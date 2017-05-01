
Template.addUserDialog.events({
    'click .close': function(e, tmpl){
        hideDialog();
    },

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

var hideDialog = function(){
    var parentView = Blaze.currentView.parentView.parentView;
    var parentInstance  = parentView.parentView.templateInstance();
    return parentInstance.dialogAddUser.set(false);
};