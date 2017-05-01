Template.userRoles.onCreated(function(){
    this.channel = new ReactiveVar(null);
});

Template.userRoles.helpers({
    roles: function(){
        return Roles.find({_id: { $nin: ["admin" , "user"] }}).fetch();
    },
    channels: function(){
        return Channels.find().fetch();
    },
    globalRoles: function(){
     return  Roles.find({$or: [{_id: "user"}, {_id: 'admin'}]}).fetch();
    },
    users: function(){
         return Meteor.users.find({'_id': {$ne: User.id()}}).fetch();
    },
    permissionActive:function() {
        if(Meteor.users.findOne({_id: this.userId, 'teams': {$elemMatch: {id: currentTeamId(), role: {$eq: Rol.ADMIN}}}})){
            return "checked";
        }
        else{
            if(Template.instance().channel.get() != null){
                var channelId = getChannelId(Template.instance().channel.get(), currentTeamId());
                if(TeamsChannel.findOne({userId: this.userId, teamId: currentTeamId(), channels: {$elemMatch: {id: channelId, role: this.roleId}}})){
                    return "checked"
                }
            }
        }
    },
    isTeamAdmin: function() {
        if (Meteor.users.findOne({
                _id: this._id,
                'teams': {$elemMatch: {id: currentTeamId(), role: {$eq: Rol.ADMIN}}}
            })) {
            return "checked";
        }
    }
});

Template.userRoles.events({
    'change select':function(e,t){
        t.channel.set(e.target.value);
    },
    'click .backLink': function(e,t){
        FlowRouter.go('channel', { team: Session.get("team"), channel: 'general' });
    },

    'click .rows':function(e,t) {
        var userId = e.currentTarget.id;
        var role = e.target.id;
        console.log(e.target.id);
        if (userId !== "" && role != "") {
            if (e.target.getAttribute('name') === "adminRole") {
                if (!e.target.getAttribute('checked')) {
                    Meteor.call('addUserToRole', role, currentTeamId(), userId);
                } else {
                    Meteor.call('addUserToRole', Rol.USER, currentTeamId(), userId);
                }
            }
            console.log(t.channel.get());
            if(t.channel.get()!= null){
                if (e.target.getAttribute('name') === "channelRoles") {
                    if(!e.target.getAttribute('checked')){
                        Meteor.call('addUserToChannelRole', role, currentTeamId(), userId, null, t.channel.get() );
                    }else{
                        Meteor.call('removeUserFromChannelRole', role, currentTeamId(), userId, null, t.channel.get() );
                    }
                }
            }
        }
    }
});