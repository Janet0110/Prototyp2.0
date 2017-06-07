/*Liefert Datenbestand Teams anhand der UserId*/
Meteor.publish("myTeams", function(userId) {
    console.log(userId);
    var result = Teams.find({"users.user" : userId});
    return result;
});

/*liefert Datenbestand Team durch teamname*/
Meteor.publish("getTeamByName", function(teamname){
    var result = Teams.find({"name": teamname});
    return result;
});

/*Liefert Datenbestand für die Benutzer im Team*/
Meteor.publish("usersInTeam", function(teamname){
    var result = Teams.findOne({"name": teamname});
    return Meteor.users.find({"teams.id": result._id}, {fields:{
        _id: 1,
        username: 1,
        teams: 1
    }});

});
