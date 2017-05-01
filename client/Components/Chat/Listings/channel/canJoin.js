canJoin = function(teamName, channelName, userId){
    Meteor.call('canJoinChannel', teamName,  channelName, userId, function(err, canJoin){
        if(canJoin){
            return true;
        }else{
           return false;
        }
    });
};