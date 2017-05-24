Template.channelTool.onCreated(function(){
    this.dialog = new ReactiveVar(false);
    this.dialogAddUser= new ReactiveVar(false);
});

Template.channelTool.helpers({
    dialogState: function(){
        return Template.instance().dialog.get();
    },
    dialogAddUserState: function(){
        return Template.instance().dialogAddUser.get();
    },
    channelList: function(){
        return [
            {menuName: "Remove Channel", id: "rmvChannelBtn"},
            {menuName: "Add user", id: "addUserBtn"},
            {menuName: 'Toast', id: "toast"}
        ]
    }
});

Template.channelTool.events({
    'click #rmvChannelBtn': function(evt, tmpl){
        Meteor.call('hasChannelPermission', Perm.DELETE_CHANNEL, currentTeamId(), User.id(), currentChannelId(), function(err, hasPermission){
            if(hasPermission){
                tmpl.dialog.set(true);
            }else{
                Materialize.toast('Not allowed', 4000, "error");
            }
        });
    },
    'click #addUserBtn': function(evt, tmpl){
        Meteor.call('hasChannelPermission', Perm.ADD_USER_TO_CHANNEL, currentTeamId(), User.id(), currentChannelId(), function(err, hasPermission){
            if(hasPermission){
                tmpl.dialogAddUser.set(true);
            }else{
                Materialize.toast('Not allowed', 4000, "error");
            }
        });
    },
    'click #toast': function(evt, tmpl){
          Materialize.toast('Test done', 4000, "success");
    }
});