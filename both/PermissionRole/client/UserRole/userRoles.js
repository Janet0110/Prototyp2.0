/*Instanziieren einer reakiven Varibale, bei Erstellen des Templates*/
Template.userRoles.onCreated(function(){
    this.channel = new ReactiveVar(null);
});
/*Helpers für die Verwendung im Template*/
Template.userRoles.helpers({
    /*holt sich Rollen*/
    roles: function(){
        return Roles.find({_id: { $nin: ["admin" , "user"] }}).fetch();
    },
    /*holt sich die Channels im Team*/
    channels: function(){
        return Channels.find().fetch();
    },
    /*holt sich globale Rollen*/
    globalRoles: function(){
     return  Roles.find({$or: [{_id: "user"}, {_id: 'admin'}]}).fetch();
    },
    /*holt sich die Benutzer */
    users: function(){
         return Meteor.users.find({'_id': {$ne: User.id()}}).fetch();
    },
    /*Überprüft, ob die Berechtigung für den Benutzer aktiv ist*/
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
    /**berprüft ob Benutzer ein Admin ist, um den Haken zu setzen*/
    isTeamAdmin: function() {
        if (Meteor.users.findOne({
                _id: this._id,
                'teams': {$elemMatch: {id: currentTeamId(), role: {$eq: Rol.ADMIN}}}
            })) {
            return "checked";
        }
    }
});
/*Handling von Events*/
Template.userRoles.events({
    /*setzt einen Channel als Auswahl*/
    'change select':function(e,t){
        t.channel.set(e.target.value);
    },
    /*Handling für Route (Zurück zur Chatinstanz)*/
    'click .backLink': function(e,t){
        FlowRouter.go('channel', { team: Session.get("team"), channel: 'general' });
    },

    /*akutalisiert User-Rolle*/
    'click .rows':function(e,t) {
        var userId = e.currentTarget.id;
        var role = e.target.id;
        if (userId !== "" && role != "") {
            if (e.target.getAttribute('name') === "adminRole") {
                if (!e.target.getAttribute('checked')) {
                    Meteor.call('addUserToRole', role, currentTeamId(), userId);
                } else {
                    Meteor.call('addUserToRole', Rol.USER, currentTeamId(), userId);
                }
            }
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