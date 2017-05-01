Meteor.methods({
    'addUserToChannelRole': function(roleName, teamId,  userId, userName, channelName) {
        var user = null;
        if(userId == null){
            user = Meteor.users.findOne({username: userName});
        }

        if(userName== null){
            user = Meteor.users.findOne({_id: userId});
        }

        if(!user){
            throw new Meteor.Error("User doesn't exists");
        }

        var channel = Channels.findOne({name: channelName});
        if (Meteor.userId()) {

            var channelExists = Meteor.users.find({_id: user._id, teams: {$elemMatch: {id: teamId, channels: {$elemMatch: {id: channel._id}}}}}).fetch();
            if(channelExists.length === 0){
                console.log("channel doesnt exists");

                var opts = {
                    id: channel._id,
                    role: roleName
                };

                Meteor.users.update({
                    _id: user._id,
                    'teams': {$elemMatch: {id: teamId}}
                }, {$push: {'teams.$.channels': opts}},{upsert: true}, function (err) {
                    console.log(err);
                });

                TeamsChannel.update({
                    userId: user._id,
                    teamId: teamId},{$addToSet: {"channels": opts}}, {upsert: true})
            }else{
                var userInTeam = Meteor.users.findOne({_id: user._id, teams: {$elemMatch: {id: teamId}}});
                if(!userInTeam){
                    throw new Meteor.Error("User is not in team");
                }
                var opts = {
                    id: channel._id,
                    role: roleName
                };

                var hasRoleInTeam = TeamsChannel.findOne({userId: user._id, teamId: teamId, "channels.id": channel._id});
                if(!hasRoleInTeam){
                    console.log("dsjfnsdjfnjsdf");
                    TeamsChannel.update({
                        userId: user._id,
                        teamId: teamId},{$addToSet: {"channels": opts}}, {upsert: true})
                }else{
                    TeamsChannel.update({
                        userId: user._id,
                        teamId: teamId, channels: {$elemMatch: {id: channel._id}}},{$set: {"channels.$.role": roleName}})
                }
            }
        }
    }
});

