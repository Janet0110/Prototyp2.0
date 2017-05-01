isTeamOwner = function(teamId, userId) {
    var owner = Teams.findOne({_id: teamId}, {fields: {
        _id: 0,
        owner: 1
    }});
    if(owner.owner === userId){
        return true
    }else{
        return false;
    }
};
