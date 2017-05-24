canAccessChannel = function(teamId, channelId, userId){
    var admin = Meteor.users.findOne({_id: userId, 'teams': {$elemMatch: {id: teamId, role: {$eq: Rol.ADMIN}}}});
    if(admin){
        return true;
    }else{

        var user = Meteor.users.findOne({_id: userId, 'teams': {$elemMatch: {id: teamId}}}, {fields: {
            'teams.role': 1,
            _id: 0
        }});

        var usersTeams = Meteor.users.find({_id: userId, teams: {$elemMatch: {id: teamId}}}, {fields:{'teams':1, _id: 0}}).fetch();
        for(var i = 0; i< usersTeams.length; i++){
            var teams = usersTeams[i].teams;

            for(var j = 0; j < teams.length; j++){
                var channels = teams[j].channels;
                for(var k = 0; k <channels.length; k++){
                    var channel = channels[k];
                    if(channel.id === channelId){
                       var result = hasPermission(channel.role, Perm.JOIN_PRIVATE_CHANNEL);
                        if(result){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }
                }
            }
        }
    }
};