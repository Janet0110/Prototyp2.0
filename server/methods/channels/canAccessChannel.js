Meteor.methods({
    canJoinChannel: function(teamName, channelName, userId) {

        var user = Meteor.users.findOne(userId);
        if(!user){
            throw new Meteor.Error("Unauthorized access");
        }
        var team = Teams.findOne({name: teamName});

        if(!team){
            throw new Meteor.Error(404, 'Team does not exist');
        }

        var channel = Channels.findOne({$and: [{"team._id": team._id}, {name: channelName }]});

        if(!channel){
            throw new Meteor.Error(404, 'Channel does not exist');
        }

        if(channel.private){
            return (canAccessChannel(team._id, channel._id, user._id))
        }else{
            return true;
        }
            }
});