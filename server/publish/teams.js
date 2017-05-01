Meteor.publish("myTeams", function(userId) {
    console.log(userId);
    var result = Teams.find({"users.user" : userId});
    return result;
});

Meteor.publish("getTeamByName", function(teamname){
    var result = Teams.find({"name": teamname});
    return result;
});

Meteor.publish("usersInTeam", function(teamname){
    var result = Teams.findOne({"name": teamname});
    return Meteor.users.find({"teams.id": result._id}, {fields:{
        _id: 1,
        username: 1,
        teams: 1
    }});

});
