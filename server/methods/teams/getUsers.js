Meteor.methods({
   'getUsersInTeam': function(teamId){
       var users =  Teams.find({_id: teamId}, {fields: {"users.user": 1}}).fetch();
       return users;
   }
});