Meteor.methods({
    /*liefert Team durch Angabe des teamnamens*/
    'getUsersInTeam': function(teamId){
       var users =  Teams.find({_id: teamId}, {fields: {"users.user": 1}}).fetch();
       return users;
   }
});