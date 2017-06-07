Meteor.methods({
    /*Fügt einen Benutzer zum Channel*/
    addUserToChannel: function(userName, channelId, teamId) {
        var user = Meteor.users.findOne({name: username});
        if(!user){
            throw new Meteor.Error("User doesn't exists");
        }

        var channel = Channels.findOne({_id: channelId});
        if(!channel){
            throw new Meteor.Error("Channel doesn't exists");
        }

        var team = Teams.findOne({_id: teamId});
        if(!team){
            throw new Meteor.Error("Team doesn't exists");
        }

        var opts = {
            channels:{
                id: channelId,
                role: Rol.MEMBER
            }
        };

        Meteor.users.update({_id: user._id}, {teams: opts}, {upsert: true})
    }
});