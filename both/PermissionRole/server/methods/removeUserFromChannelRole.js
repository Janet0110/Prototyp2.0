Meteor.methods({
    /*Löscht eine Channel-Rolle */
    'removeUserFromChannelRole': function(roleName, teamId,  userId, username, channelName){
        var channel = Channels.findOne({"name": channelName});
        if(Meteor.userId()){
            if(roleName === "admin" || roleName === "user"){
                return Meteor.users.update(
                    { _id: userId },
                    { $set: {"teams.role": roleName}}
                );
            }else{
                TeamsChannel.update({userId: userId}, {$pull: {"channels": {id: channel._id}}});
            }
        }
    }
});