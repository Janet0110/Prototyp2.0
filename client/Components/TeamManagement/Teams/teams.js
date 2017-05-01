Template.teams.helpers({
    teams: function(){
        return Teams.find({"users.user": User.id()}).fetch()
    }
});